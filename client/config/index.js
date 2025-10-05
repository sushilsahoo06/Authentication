
export const registationFromControls=[
  {
    name:'userName',
    label:'username',
    placeholder:'Enter your name',
    componentType:'input',
    type:'text',
    
  },
  {
    name:'email',
    label:'Email',
    placeholder:'Enter your email',
    componentType:'input',
    type:'email',

  },
  {
    name:'password',
    label:'password',
    placeholder:'Enter your password',
    componentType:'input',
    type:'password',

  },
  {
    name: 'otp', 
    label: 'Verification Code (OTP)',
    placeholder: 'Enter 6-digit OTP',
    componentType: 'input', 
    type: 'text',         
    maxLength: 6,
  }
]


export const loginFromControls=[
  {
    name:'email',
    label:'email',
    placeholder:'Enter your email',
    componentType:'input',
    type:'email',

  },
  {
    name:'password',
    label:'password',
    placeholder:'Enter your password',
    componentType:'input',
    type:'password',

  },
]
