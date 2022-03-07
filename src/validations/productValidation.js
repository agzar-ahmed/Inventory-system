import * as yup from 'yup';

export const incomingProductSchema = yup.object({
  userId:yup.number().typeError('This field is required').required().positive(),
  itemId:yup.number().typeError('This field is required').required().positive(),
  providerId:yup.number().typeError('This field is required').required().positive(),
  manufacturerId:yup.number().typeError('').positive(),
  inventoryId:yup.number().typeError('This field is required').required().positive(),
  purchaseDate:yup.date().typeError('This field is required').default(() => new Date()),
  expirationDate: yup.date().typeError('You must specify a date'),
  productionDate: yup.date().typeError('You must specify a date'),
  // purchasePrice:yup.number().typeError('This field is required').required().positive(),
  quantity:yup.number().typeError('This field is required').positive().nullable(true),
  unitPrice:yup.number().typeError('This field is required').required().positive(),
  VATRate:yup.number().typeError('This field is required').required().positive(),
  msrp:yup.number().typeError('').positive(),
  // discount:yup.number().typeError('This field is number'),
  // tatalExTax:yup.number().typeError('This field is required').required().positive(),
  // totalIncTax:yup.number().typeError('This field is required').required().positive(),
  minLevel:yup.number().typeError('').positive(),
  });


  
export const itemSchema = yup.object({
  
  name: yup.string().required().label("Product name"),
  description: yup.string().max(100),
  sku: yup.string(),
  productImg:  yup.object()
                  .nullable(),
  //                  .required('Image is required')
  //                  .test('is-correct-file', 'VALIDATION_FIELD_FILE_BIG',checkIfFilesAreTooBig)
                  //  .test('is-big-file','VALIDATION_FIELD_FILE_WRONG_TYPE',checkIfFilesAreCorrectType),
  ItemTypeId: yup.number().typeError('Product type is required').required().positive(),
  SizeId: yup.number().typeError('Size is required').required().positive()
  // name: string().required(),
  // age: number().required().positive().integer(),
  // email: string().email(),
  // website: string().url().nullable(),
  // createdOn: date().default(() => new Date()),
});

/*VALIDATIO <FUCTIONS></FUCTIONS>*/

  function checkIfFilesAreTooBig(files) {
    let valid = true
    if (files) {
      files.map(file => {
        const size = file.size / 1024 / 1024 // convet to Moctet
        if (size > 10) {
          valid = false
        }
      })
    }
    return valid
  }
  
function checkIfFilesAreCorrectType(files) {
    let valid = true
    if (files) {
      files.map(file => {
        if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
          valid = false
        }
      })
    }
    return valid
  }