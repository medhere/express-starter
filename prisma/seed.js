const { conn } = require("../app/config");

const seeder = {
    estates:[{
        id: 1,
        name:'',
        created_at: conn.fn.now(),
      },{
        id: 2,
        name:'',
        created_at: conn.fn.now(),
      }
    ],
}


const dbup = async()=>{

    try {

        const trx = await conn.transaction();

        for (var key in seeder) {
            console.log(`Seeding into table: ${key}`)
            await trx(key).insert(seeder[key])
        }

        await trx.commit();
        trx.isCompleted() && console.log('Seeding completed')
        process.exit(1);
        
    } catch (err) {
        console.error(err)
        process.exit(1);
    }
} 

dbup()
