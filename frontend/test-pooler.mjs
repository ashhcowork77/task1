import pg from 'pg';
const { Client } = pg;

// Correct pooler URL format
const pooler = new Client({
  connectionString: 'postgresql://postgres.rpdtgvlmkatryubvlzqu:1878NewtonHeath@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false },
});

async function test() {
  console.log('Testing pooler connection...');
  try {
    await pooler.connect();
    const r = await pooler.query('SELECT id, title FROM properties LIMIT 3');
    console.log('Pooler: Found', r.rows.length, 'properties');
    r.rows.forEach(row => console.log('  -', row.title));
    await pooler.end();
  } catch (e) {
    console.log('Pooler failed:', e.message);
  }
}

test().catch(console.error);
