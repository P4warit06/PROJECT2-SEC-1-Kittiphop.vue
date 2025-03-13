console.log('starting line...');
// setTimeout is an asynchronous function
// setTimeout(() =>  console.log(' processing...'), 5000);
let isDone = false
setTimeout(() => isDone = true, 5000);
console.log(`isDone: ${isDone}`);
console.log('ending line...');
//เวลาเรียก fetch API จะคล้ายๆ doSomething 
//โครงสร้างของ fetch API
// async -> sync ต้องรอให้มันจนเสร็๗

async function doSomething() {
    let flag = 0
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            flag === 1 ? reject('your job failed') : resolve('your job is done')
        }, 5000)
        
    })
}
console.log('starting...')
// 1. .then().catch()
// doSomething().then((status) => {
//     // resolve
//     console.log(status)
//     console.log('processing...')
//     console.log('ending...')
// })
// .catch((error) => {
//     // reject
//     console.log(`Error: ${error}`)
// })

// 2. async + await + try + catch
async function test(){
   try {
        const status = await doSomething()
        console.log(status)
        console.log('processing...')
        console.log('ending...')
    }
    catch (error) {
        console.log(`Error: ${error}`)
   }
}

test();