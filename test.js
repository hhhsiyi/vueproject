const a =true;
if (a === true) {
    console.log('1次加载');
} else {
    console.log('2次加载');
}

const aa = {
    page:1,
}
setTimeout(()=>{
    console.log(aa);
    console.log(aa.page);
    aa.page++;

},3000)
