const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

  before(async () => {
    const testConOne = new Concert({
      _id: '5d9f1140f10a81216cfd4408',
      performer: 'John1',
      genre: 'rock1',
      price: 10,
      day: 1,
      image: 'image1'
    });
    await testConOne.save();
  
    const testConTwo = new Concert({
      _id: '5d9f1159f81ce8d1ef2bee48',
      performer: 'John2',
      genre: 'rock2',
      price: 20,
      day: 2,
      image: 'image2'
    });
    await testConTwo.save();
  });
  
  it('/ should return all concerts', async () =>  {

    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);

  });

  it('/:id should return one concert by :id ', async () => {

    const res = await request(server).get('/api/concerts/5d9f1159f81ce8d1ef2bee48');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;

  });

  it('/:performer should return concert by :performer ', async () => {

    const res = await request(server).get('/api/concerts/performer/John2');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;

  });

  it('/:genre should return concert by :genre ', async () => {

    const res = await request(server).get('/api/concerts/genre/rock1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;

  });

  it('/:min/:max should return concert by price between min and max ', async () => {

    const res = await request(server).get('/api/concerts/price/5/15');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
    expect(res.body.length).to.be.equal(1);

  });

  it('/:day should return concert by :day ', async () => {

    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
    expect(res.body.length).to.be.equal(1);

  });

  after(async () => {
    await Concert.deleteMany();
  });

});