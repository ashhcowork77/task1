import pg from 'pg';
const { Client } = pg;

// Direct connection
const direct = new Client({
  connectionString: 'postgresql://postgres:1878NewtonHeath@db.rpdtgvlmkatryubvlzqu.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false },
});

// Session pooler (if needed)
const pooler = new Client({
  connectionString: 'postgresql://postgres.rpdtgvlmkatryubvlzqu:postgres@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false },
});

async function test() {
  console.log('Testing direct connection...');
  try {
    await direct.connect();
    const r = await direct.query('SELECT id, title FROM properties LIMIT 3');
    console.log('Direct: Found', r.rows.length, 'properties');
    r.rows.forEach(row => console.log('  -', row.title));
    await direct.end();
  } catch (e) {
    console.log('Direct failed:', e.message);
  }
  
  console.log('\nTesting pooler connection...');
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
