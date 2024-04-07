import db from '../../utilities/databaseUtilities';
import { Request, Response, NextFunction } from 'express';
test('test CreateEntity', () => {
    let key = 0;
    let v = db.createEntity(0,'Testing via UT','Completed');
    expect(v).toBe(undefined);
    // db.deleteEntity(0);
});

test('test readEntity',async ()=>{

    const mockRequest={
        body: jest.fn(),
        params: jest.fn()
    };

    const mockResponse={
        json: jest.fn(),
        status: jest.fn(),
    };
    let t = db.readEntity(0,mockResponse);
    let g = await t;
    console.log(g);
    console.log(mockResponse.json())
    expect(mockResponse.json()).toBe(undefined);
    
});