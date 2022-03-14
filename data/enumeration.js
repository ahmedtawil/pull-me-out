const _ = require('lodash')

exports.sex = {
    MALE: {
        ar: 'ذكر',
        en: 'male'
    },
    FEMALE: {
        ar: 'أنثى',
        en: 'female'
    }
}

exports.socialState = {
    MARRIED: {
        ar: 'متزوج',
        en: 'married'
    },
    SINGLE: {
        ar: 'أعزب',
        en: 'single'
    },
    DIVORCED: {
        ar: 'مطلق',
        en: 'divorced'
    },
    WIDOWER: {
        ar: 'أرمل',
        en: 'widower'
    }
}

exports.citizen = {
    REFUEE: {
        ar: 'لاجئ',
        en: 'refuee'
    },
    CITIZEN: {
        ar: 'مواطن',
        en: 'citizen'
    },
}


exports.governorate = {
    GAZA: {
        ar: 'محافظة غزة',
        en: 'gaza'
    },
    MIDDLE: {
        ar: 'محافظة الوسطى',
        en: 'middle'
    },
    NORTHGAZA: {
        ar: 'محافظة شمال غزة',
        en: 'northGaza'
    },
    KHANYUNIS: {
        ar: 'محافظة خانيونس',
        en: 'khanYunis'
    },
    RAFAH: {
        ar: 'محافظة رفح',
        en: 'rafah'
    }
}

exports.days = {
    SATURDAY: {
        ar: 'السبت',
        en: 'saturday'
    },
    SUNDAY: {
        ar: 'الأحد',
        en: 'sunday'
    },
    MONDAY: {
        ar: 'الأثنين',
        en: 'monday'
    },
    TUESDAY: {
        ar: 'الثلاثاء',
        en: 'tuesday'
    },
    WEDNESDAY: {
        ar: 'الأربعاء',
        en: 'wednesday'
    },
    THURSDAY: {
        ar: 'الخميس',
        en: 'thursday'
    },
    FRIDAY: {
        ar: 'الجمعة',
        en: 'friday'
    }
}

exports.disabilities = {
    MOVE: {
        ar: 'حركية',
        en: 'move'
    },
    VISUAL: {
        ar: 'بصرية',
        en: 'visual'
    },
    HEAR: {
        ar: 'سمعية',
        en: 'hear'
    },
    TALK: {
        ar: 'نطق وكلام',
        en: 'talk'
    },
    UNDERSTAND: {
        ar: 'تعلم / فهم',
        en: 'understand'
    },
    ACTIVE: {
        ar: 'أنشطة الحياة اليومية',
        en: 'active'
    }
}

exports.mediaclServices = {
    physicalTherapy: {
        ar: 'العلاج الطبيعي',
        en: 'physicalTherapy'
    },
    occupationalTherapy: {
        ar: 'العلاج الوظيفي',
        en: 'visual'
    },
    speechTherapy: {
        ar: 'علاج النطق',
        en: 'speechTherapy'
    },
    hearingTest: {
        ar: 'فحص السمع',
        en: 'talk'
    },
    psychiatricTreatment: {
        ar: 'العلاج النفسي',
        en: 'psychiatricTreatment'
    },
    nursingTreatment: {
        ar: 'التمريض',
        en: 'nursingTreatment'
    },
    psychologicalCounseling: {
        ar: 'الدعم النفسي',
        en: 'psychologicalCounseling'
    }
}

exports.sessionState = {
    EVALUATION: {
        ar: 'تقييم',
        en: 'evaluation'
    },
    THERAPY: {
        ar: 'علاج',
        en: 'therapy'
    },
    GRADUATED: {
        ar: 'تخريج',
        en: 'graduated'
    }
}
exports.program = {
    Rehabilitation: {
        ar: 'التاهيل',
        en: 'eehabilitation'
    },
    Education: {
        ar: 'التعليم',
        en: 'education'
    },

}

exports.paymentStatus = {
    paid: {
        ar: 'مسدد',
        en: 'paid'
    },
    unpaid: {
        ar: 'غير مسدد',
        en: 'unpaid'
    },
    deferral: {
        ar: 'مؤجل',
        en: 'deferral'
    },
    exempt: {
        ar: 'معفى',
        en: 'exempt'
    },
    exemptAll:{
        ar: 'اعفاء كلي',
        en: 'exemptAll'
    },
    batch: {
        ar: 'دفعة',
        en: 'batch'
    },
    discount:{
        ar:'خصم',
        en:'discount'
    },
    discountAll:{
        ar:'خصم كلي',
        en:'discountAll'
    },


}

exports.roles = {
    ADMIN: {
        ar: 'ادمن',
        en: 'admin'
    },
    SUPERVISOR: {
        ar: 'مشرف',
        en: 'superVisor'
    },
    RECEPTION:{
        ar:'استقبال',
        en:'reception'
    },
    SPECIALIST:{
        ar:'اخصائي',
        en:'specialist'
    },
    SOCIALRESEARHER:{
        ar:'اخصائي خدمة اجتماعية',
        en:'socialresearcher'
    },
    DATAENTRY:{
        ar:'مدخل بيانات',
        en:'dataEntry'
    }
}
exports.workType = {
    EMPLOYEE: {
        ar: 'موظف',
        en: 'employee'
    },
    TRAINEE: {
        ar: 'متدرب',
        en: 'trainee'
    },
    VOLUNTEER:{
        ar:'متطوع',
        en:'volunteer'
    },
    CONTRACTEMPLOYEE:{
        ar:'موظف عقد',
        en:'contractEmployee'
    },
    OTHER:{
        ar:'غير ذلك',
        en:'other'
    },
    PARTIALLYVOLUNTEER:{
        ar:'متطوع بنسبة',
        en:'partiallyVolunteer'
    },
}


exports.objToEnumArr = (obj, lang = "en") => {
    return Object.values(_.mapValues(obj, function (o) {

        return (lang == "en") ? o.en : o.ar
    }))
}