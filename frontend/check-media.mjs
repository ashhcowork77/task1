import pg from 'pg';
const { Client } = pg;

const client = new Client({
  connectionString: 'postgresql://postgres.rpdtgvlmkatryubvlzqu:1878NewtonHeath@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false },
});

async function check() {
  await client.connect();
  const result = await client.query('SELECT id, url, alt, filename FROM media');
  console.log('Media entries:');
  result.rows.forEach(r => console.log(`  ${r.id}: ${r.url} (${r.filename})`));
  await client.end();
}

check().catch(console.error);
