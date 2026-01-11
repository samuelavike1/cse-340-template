-- Assignment 2 - Task One SQL Statements
-- CSE 340

-- Query 1: Insert Tony Stark into the account table
INSERT INTO public.account (
    account_firstname,
    account_lastname,
    account_email,
    account_password
)
VALUES (
    'Tony',
    'Stark',
    'tony@starkent.com',
    'Iam1ronM@n'
);


-- Query 2: Update Tony Stark's account_type to 'Admin'
UPDATE public.account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';


-- Query 3: Delete Tony Stark from the database
DELETE FROM public.account
WHERE account_email = 'tony@starkent.com';


-- Query 4: Update GM Hummer description - change "small interiors" to "a huge interior"
UPDATE public.inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';


-- Query 5: Inner Join - Select make, model from inventory and classification_name from classification for "Sport" category
SELECT
    inv.inv_make,
    inv.inv_model,
    cls.classification_name
FROM public.inventory inv
INNER JOIN public.classification cls
    ON inv.classification_id = cls.classification_id
WHERE cls.classification_name = 'Sport';


-- Query 6: Update inv_image and inv_thumbnail to add "/vehicles" to the path
UPDATE public.inventory
SET
    inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
