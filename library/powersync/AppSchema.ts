//import { column, Schema, Table } from '@powersync/web';
import { column, Schema, Table } from "@powersync/react-native";

const body_measurements_types = new Table(
  {
    // id column (text) is automatically included
    name: column.text,
    deleted: column.integer,
    created_at: column.text,
    updated_at: column.text,
  },
  { indexes: {} }
);

const users_weight = new Table(
  {
    // id column (text) is automatically included
    date_at: column.text,
    user_id: column.text,
    weight_kg: column.real,
    deleted: column.integer,
    created_at: column.text,
    updated_at: column.text,
  },
  { indexes: {} }
);

const users_body_fat = new Table(
  {
    // id column (text) is automatically included
    date_at: column.text,
    user_id: column.text,
    body_fat: column.real,
    deleted: column.integer,
    created_at: column.text,
    updated_at: column.text,
  },
  { indexes: {} }
);

const users_pr = new Table(
  {
    // id column (text) is automatically included
    user_id: column.text,
    title: column.text,
    description: column.text,
    medias: column.text,
    tags: column.text,
    date_at: column.text,
    deleted: column.integer,
    created_at: column.text,
    updated_at: column.text,
  },
  { indexes: {} }
);

const users_info = new Table(
  {
    // id column (text) is automatically included
    user_id: column.text,
    username: column.text,
    gender: column.text,
    birthday: column.text,
    created_at: column.text,
    updated_at: column.text,
  },
  { indexes: {} }
);

const users_profiles = new Table(
  {
    // id column (text) is automatically included
    user_id: column.text,
    picture_url: column.text,
    url: column.text,
    description: column.text,
    deleted: column.integer,
    created_at: column.text,
    updated_at: column.text,
  },
  { indexes: {} }
);

const users_settings = new Table(
  {
    // id column (text) is automatically included
    user_id: column.text,
    pref_theme: column.text,
    pref_unit: column.text,
    deleted: column.integer,
    created_at: column.text,
    updated_at: column.text,
  },
  { indexes: {} }
);

const users_progress_media = new Table(
  {
    // id column (text) is automatically included
    user_id: column.text,
    medias: column.text,
    date_at: column.text,
    deleted: column.integer,
    created_at: column.text,
    updated_at: column.text,
  },
  { indexes: {} }
);

const users_body_measurements_cm = new Table(
  {
    // id column (text) is automatically included
    user_id: column.text,
    date_at: column.text,
    body_measurement_id: column.text,
    measurement: column.real,
    created_at: column.text,
    updated_at: column.text,
  },
  { indexes: {} }
);

export const AppSchema = new Schema({
  body_measurements_types,
  users_weight,
  users_body_fat,
  users_pr,
  users_info,
  users_profiles,
  users_settings,
  users_progress_media,
  users_body_measurements_cm,
});

export type Database = (typeof AppSchema)["types"];
