sap.ui.define([], function() {
    'use strict';
    return {
        fnstatus(price)
        {
            if(price>800)
            {
                return 'Expensive'
            }

            else if(price>750)
            {
                return  'Moderate'
            }

            else
            {
                return 'Cheap'
            }
        },

        fncolor(price)
        {
       
            if(price>800)
            {
                return 'Error'
            }

            else if(price>750)
            {
                return 'Information'
            }
            else
            {
                return 'Success'
            }
        }
    }
});

