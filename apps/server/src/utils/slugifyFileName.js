import slugify from 'slugify';

slugify.extend({
  Ї: 'Yi',
  ї: 'yi',
  Є: 'Ye',
  є: 'ye',
  Ґ: 'G',
  ґ: 'g',
});

export const slugifyFileName = (name) =>
  slugify(name, {
    lower: true,
    strict: true,
  });
