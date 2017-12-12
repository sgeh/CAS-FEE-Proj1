import express from 'express';
import path from 'path';

let routes = express.static(path.resolve('./static'));

export default routes;