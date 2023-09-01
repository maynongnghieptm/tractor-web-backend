// Dữ liệu gửi từ WEBclient tới Server , Server dựa vào id_tractor để chuyển tin nhắn tới tractor đích bất kỳ đang online)            
ver = new long[1];
            /*
            [0]: version của json hiện tại ( để phân biệt trước khi phân tích cú pháp bên trong json này )
            */

id_webclient = new String[1]    /*ID webclient gửi tin nhắn này*/
cmd_ctr= { 
    id_tractor: new String[1] , /*ID tractor Nhận tin nhắn này*/
    /*Nếu ID ="__ALL_ONLINE__"  thì gửi cmd này tới tất cả tractor đang online*/
    cmd: {   
        JSON_data 
    }
    /*   JSON chứa dữ liệu điều khiển ,nội dung của cmd sẽ là bất kỳ , server không quan tâm */
}



// Dữ liệu phản hồi từ 1 tractor đơn lẻ  ( gửi từ Tractor tới Server , Server dựa vào id_webclient để chuyển tin nhắn tới WEBClient)
ver = new long[ 1];


/*
version của json hiện tại ( để phân biệt trước khi phân tích cú pháp bên trong json này )
*/
id_tractor = new String[1]   /*ID tractor gửi tin nhắn này*/
cmd_rep= { 
    id_webclient: new String[1],    /*ID webclient nhận tin nhắn này*/
    rep: {
        JSON_data       /*   JSON chứa dữ liệu phản hồi  , nội dung của rep sẽ là bất kỳ , server không quan tâm*/
    },
    err: new long[N] /* Lỗi nếu có */
}



















/**
 *  
    Ví dụ : WEB_Client gửi 1 lệnh 
    {
        "ver": [345456] ,
        "id_webclient": [1434]    , 
        cmd_ctr= { 
            "id_tractor" : ["yan_0001"] ,
            "cmd" = {//nội dung của cmd sẽ là bất kỳ , server không quan tâm
                "a":"23323"
            }
        }
    }

    Server kiểm tra : Nếu tractor này không tồn tại ( hoặc không online , hoặc không được phép điều khiển) thì Server (thay mặt tractor) phản hồi lại webclient lệnh  REP giả như sau:
    {
        "ver" : [345456] ,      
        "id_tractor" : ["yan_0001"] ,
        cmd_rep= {    
            "id_webclient" : [1434]    ,
            "rep" : { },//rỗng  
            "err":[1 ] //lỗi =1 tractor này không tồn tại ,  lỗi =2 tractor không onlin , lỗi =3 không được phép ,
        }
    }


    
    Nếu được phép, Server CHUYỂN PHÁT TOÀN BỘ tin nhắn phía trên cho tractor có ID = "yan_0001":
    {
        "ver": [345456],    
        "id_webclient": [1434], 
        cmd_ctr= { 
            "id_tractor" : ["yan_0001"] ,
            "cmd" = {//nội dung của cmd sẽ là bất kỳ , server không quan tâm
                "a":"23323"
            }
        }
    }

    Máy cày sau khi nhận được CMD từ server sẽ phản hồi lại  cho Server,  Server CHUYỂN PHÁT TOÀN BỘ tin nhắn phía dưới cho Webclient có ID = "1434":
    (Server chỉ gửi nếu WEBclient này đang online và được phép(quyền) điều khiển )
    
    {
    "ver": [345456] , 
    "id_tractor": ["yan_0001"] ,
    cmd_rep= { 
        "id_webclient" : [1434]    ,
        "rep" : { //nội dung của rep sẽ là bất kỳ  , server không quan tâm
            "a": "23323", 
            "err": [] 
        },
        "err": []  //không lỗi  
        }
    }

*/
