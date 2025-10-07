import { assets } from "@/assets/assets"

export const registationFromControls=[
  {
    name:'userName',
    label:'username',
    placeholder:'Full Name',
    componentType:'input',
    type:'text',
    logo:assets.person_icon
    
  },
  {
    name:'email',
    label:'Email',
    placeholder:'Enter your email',
    componentType:'input',
    type:'email',
    logo:assets.mail_icon

  },
  {
    name:'password',
    label:'password',
    placeholder:'Enter your password',
    componentType:'input',
    type:'password',
    logo:assets.lock_icon

  },

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
