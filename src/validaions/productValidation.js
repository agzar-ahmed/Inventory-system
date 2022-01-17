import * as yup from 'yup';

export const productSchema = yup.object({
    itemId: yup.number().typeError('you must select a value').required().positive(),
    // productName: yup.string().required().label("Product name"),
    purchaseDate: yup.date().typeError('you must specify a date').default(() => new Date()),
    purchasePrice: yup.number().typeError('you must specify a number').positive(),
    expirationDate: yup.date().typeError('you must specify a date'),
    quantity: yup.number().typeError('you must specify a number').positive().nullable(true),
    // description: yup.string().max(100),
    // sku: yup.string(),
    // productImg:  yup.array()
                    // .nullable()
                    // .required('VALIDATION_FIELD_REQUIRED')
                    // .test('is-correct-file', 'VALIDATION_FIELD_FILE_BIG',checkIfFilesAreTooBig)
                    // .test('is-big-file','VALIDATION_FIELD_FILE_WRONG_TYPE',checkIfFilesAreCorrectType),
    // productTypeId: yup.number().typeError('').required().positive(),
    // sizeId: yup.number().typeError('you must select a value').required().positive(),
    manufacturerId: yup.number().typeError('you must select a value').required().positive(),
    providerId: yup.number().typeError('you must select a value').required().positive(),
    minLevel: yup.number().typeError('you must specify a number').positive(),
    inventoryId: yup.number().typeError('you must select a value').required().positive()

    // name: string().required(),
    // age: number().required().positive().integer(),
    // email: string().email(),
    // website: string().url().nullable(),
    // createdOn: date().default(() => new Date()),
  });


  
export const itemSchema = yup.object({
  productName: yup.string().required().label("Product name"),
  description: yup.string().max(100),
  sku: yup.string(),
  productImg:  yup.array()
                   .nullable()
                   .required('VALIDATION_FIELD_REQUIRED')
                   .test('is-correct-file', 'VALIDATION_FIELD_FILE_BIG',checkIfFilesAreTooBig)
                   .test('is-big-file','VALIDATION_FIELD_FILE_WRONG_TYPE',checkIfFilesAreCorrectType),
  productTypeId: yup.number().typeError('Product type is required').required().positive(),
  sizeId: yup.number().typeError('Size is required').required().positive()
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