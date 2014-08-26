/* global describe, before, beforeEach, it */

'use strict';

process.env.PORT=5555;
process.env.DB = 'goalcoach-test';

var expect = require('chai').expect,
    cp     = require('child_process'),
    app    = require('../../app/index'),
    cookie = null,
    request= require('supertest');


describe('goals', function(){
  before(function(done){
    request(app).get('/').end(done);
  });


  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [process.env.DB], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      request(app)
      .post('/login')
      .send('email=bob@1.com')
      .send('password=1')
      .end(function(err, res){
        cookie = res.headers['set-cookie'][0];
        done();
      });
    });
  });

  describe('get /', function(){
    it('should fetch the home page', function(done){
      request(app)
      .get('/')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Home');
        done();
      });
    });
  });

  describe('get /goals/new', function(){
    it('should fetch the goals page', function(done){
      request(app)
      .get('/goals/new')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Name');
        expect(res.text).to.include('Due');
        expect(res.text).to.include('Tags');
        done();
      });
    });
  });


  describe('post /goals', function(){
    it('should show the new goals page', function(done){
      request(app)
      .post('/goals')
      .set('cookie', cookie)
      .send('name=be+a+doctor&due=2014-11-30&tags=a%2Cb%2Cc%2Cd')
      .end(function(err, res){
        expect(res.status).to.equal(302);
        done();
      });
    });
  });

/*

  describe('post /goals', function(){
    it('should create the new goals page', function(done){
      request(app)
      .post('/goals')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(302);
        done();
      });
    });
  });


  describe('get /goals', function(){
    it('should show the new goals page', function(done){
      request(app)
      .post('/goals')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('marathon');
        done();
      });
    });
  });


  describe('.findAllByUserId', function(){
    it('should show the new goals page', function(done){
      request(app)
      .post('/goals')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('marathon');
        done();
      });
    });
  });

*/

});
