import { Server } from './src/server';
import 'reflect-metadata';
import Container from 'typedi';
import express from 'express';


Container.set('app', express());
new Server(Container.get('app'));