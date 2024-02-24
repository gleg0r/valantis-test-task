export default function filterData(data) {
  let newData = data;
  newData = newData.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i)
  return newData;
}