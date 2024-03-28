export function authHeader() {
    let token = localStorage.getItem('token');
    if (token) {
      	return { Authorization: 'Bearer ' + token };
    } else {
        
      	return {};
    }
}

// export function initialTranslationValues(){
//     return { ar:'', en:'' };
// }

// export function required_translation(value){
//     return value?.ar !== '' && value?.en !== '' 
// }

// export function required_translation_array(value){
//     if(!Array.isArray(value))
//         return false;
//     var valid = true;
//     value.forEach(v => {
//         if(!required_translation(v))
//             valid = false;
//     });
//     return valid;
// }

// export function translationData(name, value){
//     console.log('this is value', value);
//     var data = {};
//     data[name+'[en]'] = value.en;
//     data[name+'[ar]'] = value.ar;
//     return data;
// }

// export function translationArrayData(name, value){
//     var data = {};
//     for (let i = 0; i < value.length; i++) {
//         console.log(value[i]);
//         data[name+`[en][${i}]`] = value[i].en;
//         data[name+`[ar][${i}]`] = value[i].ar;
//     }
//     return data;
// }

// export function translationErrors(name, errors){
//     var _errors = [];
//     if(errors[name+'.en']) _errors.push(...errors[name+'.en']);
//     if(errors[name+'.ar']) _errors.push(...errors[name+'.ar']);
//     return _errors;
// }

export function _t(message, $t){
    var m = message.split('.');
    if(m.length > 0 && m[0] == '_'){
        var _message = $t(m[1]);
        var _attribute = $t(m[2]);
        return _message.replace(':attribute', _attribute);
    }
    return message;
}
