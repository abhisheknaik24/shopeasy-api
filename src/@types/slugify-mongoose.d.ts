declare module 'slugify-mongoose' {
  import { Schema } from 'mongoose';

  function slugifyMongoose(schema: Schema): void;

  export = slugifyMongoose;
}
