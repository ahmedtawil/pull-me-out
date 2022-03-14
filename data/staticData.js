exports.errors = {
    name: {
        ar: 'حقل الاسم مطلوب.',
        en: 'fill first name field.'
    },
    formalID: [
        {
            ar: 'حقل رقم الهوية مطلوب.',
            en: 'fill formall id field.'
        },
        {
            ar: 'يجب أن يحتوي رقم الهوية على 9 أرقام فقط.',
            en: 'formal id must be 9 digit'
        },
        {
            ar: 'رقم الهوية موجود مسبقا.',
            en: 'formal id already exist.'
        },
        {
            ar: 'رقم الهوية غير صالح.',
            en: 'formal id is not valid.'
        },
    ],
    birthDate: {
        ar: 'حقل تاريخ الميلاد مطلوب.',
        en: 'fill birthdate field.'
    },
    sex: [
        {
            ar: 'حقل نوع الجنس مطلوب',
            en: 'fill sex field.'
        },
        {
            ar: 'يجب ان تكون القيمة المدخلة احد الجنسين',
            en: 'value is not male or female'
        }
    ],
    socialState: [
        {
            ar: '.حقل الحالة الإجتماعية مطلوب.',
            en: 'fill social state field.'
        },
        {
            ar: '.يجب ان تكون القيمة المدخلة من الحالات الاجتماعية',
            en: 'value is not single or married.'
        }
    ],
    citizen: [{
        ar: '.حقل المواطنة مطلوب.',
        en: 'fill citizen field.'
    },
    {
        ar: '.حقل القيمة المدخلة مواطن او لاجئ',
        en: 'value is not citizen or refuee.'
    }],
    phoneNumber: [
        {
            ar: '.حقل رقم الجوال مطلوب.',
            en: 'fill phone number field.'
        },
        {
            ar: '. حقل رقم الجوال يجب ان يحتوي على 10 أرقام فقط.',
            en: 'phone number must be 10 digit.'
        },
        {
            ar: '.رقم الجوال غير صالح.',
            en: 'phone number not valid.'
        },

    ],
    address: [
        {
            ar: 'حقل المحافظة مطلوب.',
            en: 'fill governorate address field.'
        },
        {
            ar: 'يجب ادخال اسم المحافظة بشكل صحيح',
            en: 'value is not true'
        },
        {
            ar: 'حقل عنوان الحي مطلوب.',
            en: 'fill region address field.'
        },
        {
            ar: 'حقل عنوان الشارع مطلوب.',
            en: 'fill street address field.'
        }
    ],
    disabilities: [{
        ar: "حقل الإعاقات مطلوب",
        en: "fill disabilities feild "
    }, {
        ar: "قيم الاعاقات غير مدخلة بشكل صحيح",
        en: "fill disabilities true "
    }],
    educationLevel: {
        ar: "حقل المستوى التعليمي مطلوب",
        en: "please fill educationLevel"
    },
    educationalQualification: {
        ar: "حقل المؤهل العلمي مطلوب",
        en: "Please fill educationalQualification"
    },
    jobTitle: {
        ar: "حقل المسمى الوظيفي مطلوب",
        en: "Please fill JobTitle"
    },
    program: {
        ar: "حقل البرنامج مطلوب ",
        en: 'please fill program'
    },
    department: {
        ar: "حقل القسم مطلوب ",
        en: 'please fill department'
    },
    workDays: {
        ar: "حقل ايام الدوام مطلوب",
        en: "please fill workDays"
    },
    firstDateWork: {
        ar: "حقل تاريخ بداية العمل مطلوب",
        en: "Please fill First Date Work"
    },
    disabilities: [
        {
            ar: "يجب ادخال الاعاقات بشكل صحيح",
            en: "value is not true"

        },
        {
            ar: 'حقل الاعاقات مطلوب',
            en: 'fill disabilities field'
        },
        {
            ar: "حقل الاعاقات فارغ",
            en: "disabilities field is empty"
        }
    ],
    diagnosis: {
        ar: "حقل التشخيص مطلوب",
        en: "fill diagnosis field"
    },
    email: {
        ar: "حقل البريد الالكتروني مطلوب",
        en: "fill email field"
    },
    department: [
        {
            ar: "حقل القسم مطلوب",
            en: "Please fill department name"
        },
        {
            ar: "يجب ان تكون القيمة المدخلة من الاقسام الموجودة.",
            en: "deparments is not valid"
        },
        {
            ar:"الاسم موجود مسبقا",
            en:"Name is exists"
        }
    ],

    program: [
        {
            ar: "حقل البرنامج مطلوب",
            en: "Please fill program name"
        },
        {
            ar: "يجب ان تكون القيمة المدخلة احد البرامج",
            en: "program in not valid"
        },
        {
            ar:"الاسم موجود مسبقا",
            en:"Name is exists"
        }
    ],
    code: [{
        ar: "حقل الرمز مطلوب",
        en: "Please fill code"
    },
    {
        ar:"الرمز موجود مسبقا",
        en:"Code is exists"
    }],
    recipient: {
        ar: "حقل المستفيد مطلوب",
        en: "Please fill recipient"
    },
    diagnose: {
        ar: "حقل التشخيص مطلوب",
        en: "Please fill dignose"
    },
    supervisor: {
        ar: "حقل المشرف مطلوب",
        en: "please fill supervisor"
    },
    isMonthlySubscription: {
        ar: "حقل الاشتراك الشهري مطلوب",
        en: "Please fill is Monthly Subscription"
    },
    thisPrice: {
        ar: "حقل الثمن مطلوب",
        en: "Please fill the price"
    },
    sessionDate: {
        ar: "حقل تاريخ الجلسة مطلوب",
        en: "Please fill Session date"
    },
    departmentIsSupervisor: {
        ar:"يوجد قسم مشرف لهذا البرنامج",
        en:"exsist Supervisor"
    },
    workType: {
        ar:"حقل نوع العمل مطلوب",
        en:"please fill workType"
    },
    familyNum: {
        ar:"حقل عدد افراد العائلة مطلوب",
        en:"please fill familyNum"
    },
    incomeSource: {
        ar:"مصدر الدخل مطلوب",
        en:"please fill incomeSource"
    },
    socialAffairs: {
        ar:"حقل هل يستفيد من الشؤون الاجتماعية مطلوب",
        en:"please fill socialAffairs"
    },
    isDisabled: {
        ar:"حقل هل لديه اعاقات مطلوب",
        en:"please fill isDisabled"
    },
    serviceRating: {
        ar:"حقل تصنيف الخدمة مطلوب",
        en:"please fill serviceRating"
    },
    auxiliaryTools: {
        ar:"حقل الاداة المساعدة مطلوب",
        en:"please fill Utilities"
    },
    
    

}


