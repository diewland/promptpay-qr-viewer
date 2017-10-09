window.PPText2Obj = {

  PROMPTPAY_APP_ID: 'A000000677010111',
  QR_TYPE: {
    '11': 'Never expire QR-Code',
    '12': 'One-time QR-Code',
  },
  ACCOUNT_TYPE: {
    '01': 'Telephone Number',
    '02': 'Thai ID Card',
    '03': 'e-Wallet ID',
  },

  _decode: function(pp_text){
    var pp_obj = {};
    var field_no   = '';
    var field_size = '';
    for(var i=0; i<pp_text.length; i++){
      // get field no
      if(!field_no){
        field_no = pp_text.substr(i, 2);
        // console.log(i, field_no, field_size);
        i += 1;
      }
      // get field size
      else if(!field_size){
        field_size = parseInt(pp_text.substr(i, 2));
        // console.log(i, field_no, field_size);
        i += 1;
      }
      // get field value
      else {
        pp_obj[field_no] = pp_text.substr(i, field_size);
        // console.log(i, field_no, field_size, pp_obj[field_no]);
        // shift to next field
        i += (field_size-1);
        field_no   = '';
        field_size = '';
      }
    }
    return pp_obj;
  },

  decode: function(pp_text){
    var obj = this._decode(pp_text);

    // extract more field 29
    var merchant_info = obj['29'] || '';
    var merchant_obj = this._decode(merchant_info);
    if(merchant_obj['00'] != this.PROMPTPAY_APP_ID){
      return null;
    }
    for(var k in merchant_obj){
      if(k != '00'){
        obj['29_acc_type'] = k;
        obj['29_acc_no']   = merchant_obj[k];
      }
    }

    // what inside field 31 ?
    if(obj['31']){
      console.log(this._decode(obj['31']));
    }

    return obj;
  },

};
