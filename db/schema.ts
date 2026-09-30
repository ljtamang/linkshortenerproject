import { index, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const links = pgTable(
  'links',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    // app-generated random code, not derived from `id`
    short_code: varchar('short_code', { length: 16 }).notNull().unique(),
    original_url: text('original_url').notNull(),
    // Clerk user id; no local users table to reference
    user_id: text('user_id').notNull(),
    created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('links_user_id_idx').on(table.user_id)],
);
