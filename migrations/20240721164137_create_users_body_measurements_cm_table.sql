-- Add migration script here

CREATE TABLE body_measurements_types (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  has_left BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP
  WITH
    TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
  WITH
    TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO body_measurements_types (id, name, has_left) values 
  ('arms', 'arms', true), 
  ('thighs', 'thighs', true), 
  ('wrists', 'wrists', true), 
  ('calves', 'calves', true), 
  ('height', 'height', false), 
  ('neck', 'neck', false), 
  ('hips', 'hips', false), 
  ('torso', 'torso', false), 
  ('waist', 'waist', false);

CREATE TABLE users_body_measurements_cm (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  date_at DATE NOT NULL CHECK (date_at <= CURRENT_DATE),
  body_measurement_id TEXT NOT NULL, 
--   left_arm REAL CHECK (left_arm > 0),
--   right_arm REAL CHECK (right_arm > 0),
--   left_thigh REAL CHECK (left_thigh > 0),
--   right_thigh REAL CHECK (right_thigh > 0),
--   left_wrist REAL CHECK (left_wrist > 0),
--   right_wrist REAL CHECK (right_wrist > 0),
--   left_calf REAL CHECK (left_calf > 0),
--   right_calf REAL CHECK (right_calf > 0),
--   height REAL CHECK (height > 0),
--   neck REAL CHECK (neck > 0),
--   hips REAL CHECK (hips > 0),
--   torso REAL CHECK (torso > 0),
--   waist REAL CHECK (waist > 0),
  created_at TIMESTAMP
  WITH
    TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

  updated_at TIMESTAMP
  WITH
    TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT body_measurement_id_fk FOREIGN KEY (body_measurement_id) REFERENCES body_measurements_types,
    CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES auth.users
);

CREATE UNIQUE INDEX idx_body_measurements_date_user_id ON users_body_measurements_cm (user_id, date_at);
CREATE TRIGGER handle_updated_at BEFORE
UPDATE ON users_body_measurements_cm FOR EACH ROW EXECUTE FUNCTION moddatetime();
