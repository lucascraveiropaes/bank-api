# Database Structure

## USERS

* __users__
    * __id:__ integer
    * __name:__ string
    * __login:__ string
    * __password:__ string
    * __account:__ double
    * __agency:__ string
    * __balance:__ double

__________________________________________

## HISTORY

* __history__
    * __id:__ integer
    * __user_id:__ integer
    * __action:__ string _("transfer_in", "transfer_out")_
    * __value:__ double
    * __date:__ datetime
