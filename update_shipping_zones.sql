-- Insert Wilayas 59-69 into shipping_zones table
-- Default prices are set to 0. You can update them in the admin panel.
-- Added wilaya_code column which is required.

INSERT INTO shipping_zones (id, wilaya_code, wilaya_name, home_delivery_price, desk_delivery_price)
VALUES
  (59, 59, 'Aflou', 0, 0),
  (60, 60, 'Aïn Oussera', 0, 0),
  (61, 61, 'Barika', 0, 0),
  (62, 62, 'Bir El Ater', 0, 0),
  (63, 63, 'Boussaâda', 0, 0),
  (64, 64, 'El Abiodh Sidi Cheikh', 0, 0),
  (65, 65, 'El Aricha', 0, 0),
  (66, 66, 'El Kantara', 0, 0),
  (67, 67, 'Ksar Chellala', 0, 0),
  (68, 68, 'Ksar El Boukhari', 0, 0),
  (69, 69, 'Messaad', 0, 0)
ON CONFLICT (id) DO NOTHING;
