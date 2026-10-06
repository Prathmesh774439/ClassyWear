import test from 'node:test';
import assert from 'node:assert/strict';
import { mock } from 'node:test';

import * as productController from '../src/controllers/product.controller.js';
import productModel from '../src/models/product.model.js';
import * as storageService from '../src/services/storage.service.js';
import { createProductValidator } from '../src/validations/product.validator.js';

test('getSellerProducts filters by the authenticated userId', async () => {
  const findMock = mock.method(productModel, 'find', async (query) => {
    assert.deepEqual(query, { seller: 'user_123' });
    return [{ _id: 'p1' }];
  });

  const req = { user: { userId: 'user_123' } };
  const res = {
    status: (code) => ({
      json: (body) => ({ code, body })
    })
  };

  const result = await productController.getSellerProducts(req, res);

  assert.equal(result.code, 200);
  assert.equal(result.body.products.length, 1);

  findMock.mock.restore();
});

test('createProduct stores the authenticated seller instead of trusting body data', async () => {
  const uploadMock = mock.method(storageService, 'uploadFile', async ({ fileName }) => ({
    url: `https://cdn.example.com/${fileName}`
  }));

  const createMock = mock.method(productModel, 'create', async (payload) => {
    assert.equal(payload.seller, 'user_123');
    assert.equal(payload.images[0], 'https://cdn.example.com/test.png');
    return payload;
  });

  const req = {
    files: [{ buffer: Buffer.from('abc'), originalname: 'test.png' }],
    body: {
      title: 'Example product',
      description: 'A detailed description that is long enough for validation',
      price: 250,
      sizes: [{ size: 'M', stock: 10 }],
      seller: 'different_user'
    },
    user: { userId: 'user_123' }
  };

  const res = {
    status: (code) => ({
      json: (body) => ({ code, body })
    })
  };

  const result = await productController.createProduct(req, res);

  assert.equal(result.code, 200);
  assert.equal(result.body.product.seller, 'user_123');

  uploadMock.mock.restore();
  createMock.mock.restore();
});

test('createProductValidator rejects non-INR currencies', async () => {
  const req = {
    body: {
      title: 'Example product',
      description: 'A detailed description that is long enough for validation',
      price: { amount: 250, currency: 'EUR' },
      sizes: [{ size: 'M', stock: 10 }]
    }
  };

  let response;
  const res = {
    status: (code) => ({
      json: (body) => {
        response = { code, body };
        return { code, body };
      }
    })
  };

  const next = () => {
    response = { next: true };
  };

  for (const validator of createProductValidator) {
    await validator(req, res, next);
    if (response && response.code === 400) break;
  }

  assert.ok(response && response.code === 400, 'Expected validation to reject non-INR currencies');
  assert.ok(response.body.errors.some((error) => error.path === 'price.currency' && error.msg === 'Currency must be INR'));
});
