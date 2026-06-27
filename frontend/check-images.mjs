import pg from 'pg';
const { Client } = pg;

const client = new Client({
  connectionString: 'postgresql://postgres.rpdtgvlmkatryubvlzqu:1878NewtonHeath@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false },
});

async function check() {
  await client.connect();
  
  // Get all columns
  const cols = await client.query(`
    SELECT column_name 
    FROM information_schema.columns 
    WHERE table_name = 'properties' 
    ORDER BY ordinal_position
  `);
  console.log('Properties columns:', cols.rows.map(r => r.column_name).join(', '));
  
  // Get featured image id
  const result = await client.query('SELECT id, title, featured_image_id FROM properties');
  console.log('\nFeatured image IDs:');
  result.rows.forEach(r => console.log(`  ${r.title}: ${r.featured_image_id}`));
  
  // Check media table
  const media = await client.query('SELECT id, url, alt FROM media LIMIT 5');
  console.log('\nMedia URLs:');
  media.rows.forEach(r => console.log(`  ${r.id}: ${r.url}`));
  
  await client.end();
}

check().catch(console.error);
