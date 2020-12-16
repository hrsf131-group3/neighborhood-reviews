import http from 'k6/http';
import { sleep, check } from 'k6';
import { Rate } from 'k6/metrics';

export let errorRate = new Rate('errors');

export let options = {
  stages: [
    { duration: '10s', target: 100 },
    { duration: '10s', target: 200 }, // below normal load
    { duration: '30s', target: 200 },
    { duration: '10s', target: 400 }, // normal load
    { duration: '30s', target: 400 },
    { duration: '10s', target: 600 }, // around the breaking point
    { duration: '30s', target: 600 },
    { duration: '10s', target: 800 }, // beyond the breaking point
    // { duration: '30s', target: 800 },
    // { duration: '10s', target: 1000 },
    // { duration: '30s', target: 1000 },
    // { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<50'], // 99% of requests must complete below 50ms
    errors: ['rate<0.01'], // <1% errors
  },
};

export default function () {
  const res = http.get(`http://localhost:8010/listings/${Math.floor(Math.random() * 200000000)}/neighborhoods`);
  const result = check(res, {
    'status is 200': (r) => r.status === 200,
  });
  errorRate.add(!result);
  sleep(1);
};

