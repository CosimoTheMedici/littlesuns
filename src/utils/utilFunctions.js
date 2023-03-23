export function findArrayValue(arr, localValue){
    try {
        let val = null;
        val = arr.find((v) => v.value === localValue);
       return val
    } catch (error) {
      console.error(error);
    }
  }


