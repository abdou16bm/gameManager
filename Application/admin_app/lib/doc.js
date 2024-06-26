
const fs=require('fs');
const os = require('os');

const uploadFile=function(path,dir,files,filename,newname,filetype,callback){
    dir =  path + '/' +dir + '/';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    console.log('dir',dir);

    if ( (files[filename]).size > 0 ){
        // console.log('j',j);
        let oldpath=files[filename].filepath;
        let newpath= dir + newname + '.'+filetype ;

        fs.rename(oldpath,newpath, function (err){
            if (err) console.log('error : ',err);

            fs.readdir(dir, (err, files) => {

                var files_count =  files.length;

                if (callback){callback(err,files_count)};

                return err;

            });

        })
    }
    else {

        fs.readdir(dir, (err, files) => {

            var files_count =  files.length;

            if (callback){callback(err,files_count)};

            return err;

        });
    }
}


const uploadMultiFile=function(path,dir,files,filetype,callback){
    // dir = 'C:/Users/Developpeur/Desktop/'+path + '/' +dir + '/';
    // dir = os.homedir()+'/Desktop/'+path + '/' +dir + '/';

    dir = path + '/' +dir + '/';

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    //fs.mkdir(dir,function (err){

    //  console.log('err',err)
    console.log('fileu',files.file_u)
    if (typeof(files.file_u) != 'undefined') {

        fs.readdir(dir, (err, dir_content) => {

            let count = 1;
            // if ( typeof(dir_content) != 'undefined' ) count = dir_content.length;


            console.log(files.file_u);

            if ( files.file_u.length>0) {

                if ( typeof(dir_content) != 'undefined' ) {

                    for (const file of dir_content) {
                        // console.log(file + ' : File Deleted Successfully.');
                        if(file != 'main.jpg') fs.unlinkSync(dir+file);
                    }

                }

                for (let i = 0+count,j=0; i< files.file_u.length+count; i++,j++){
                    // for (let i = 0; i< files.file_u.length; i++){

                    console.log('i:',i)

                    let oldpath=files.file_u[j].filepath;
                    let newpath= dir + i + '.'+filetype ;

                    console.log('oldpath',oldpath)
                    console.log('newpath',newpath)

                    fs.rename(oldpath,newpath, function (err){

                        if (err) console.log('error : ',err);

                        fs.readdir(dir, (err, files) => {

                            var files_count =  files.length;

                            if (callback){callback(err,files_count)};

                            return err;

                        });


                    })

                }

            }
            else if ( (files['file_u']).size > 0 ){

                if ( typeof(dir_content) != 'undefined' ) {

                    for (const file of dir_content) {
                        if(file != 'main.jpg') fs.unlinkSync(dir+file);
                    }

                }

                uploadFile(dir,'',files,'file_u','1','jpg',function (err,count){

                    if (err) console.log('error : ',err);

                    fs.readdir(dir, (err, files) => {

                        var files_count =  files.length;

                        if (callback){callback(err,files_count)};

                        return err;

                    });


                })

            }
            else {

                fs.readdir(dir, (err, files) => {

                    var files_count =  files.length;

                    if (callback){callback(err,files_count)};

                    return err;

                });
            }

//})

        })

    }
}



const uploaddoc=function(path,dir,files,filetype,callback){
    dir = os.homedir()+'/Desktop/'+path + '/' +dir + '/';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    console.log('dir',dir);
    fs.readdir(dir, (err, dir_content) =>{
        let count = 0;
        if ( typeof(dir_content) != 'undefined' )
            count = dir_content.length;
// console.log('dir_content.length',dir_content.length);
        if (dir_content.length>0) {
            for (let i = 1+count,j=1; i< (6+count),j<6; i++,j++){
                // console.log('j',j);
                // console.log('i',i);
                if ( (files['img'.concat(j)]).size > 0 ){
                    // console.log('j',j);
                    let oldpath=files['img'.concat(j)].path;
                    let newpath= dir + i +'.png' ;

                    fs.rename(oldpath,newpath, function (err){
                        if (err) console.log('error : ',err);
                        if (callback){callback(err)};
                        // return err;
                    })
                }
            }
        } else if(dir_content.length==0){
            for (let i = 1 ; i < 6; i++) {
                // console.log('i',i);
                if ( (files['img'.concat(i)]).size > 0 ){
                    // console.log('files[\'img\'.concat(i)]',files['img'.concat(i)].path);
                    let oldpath=files['img'.concat(i)].path;
                    // console.log('ancien',oldpath);
                    let newpath= dir + i + '.png' ;

                    console.log('new',newpath);

                    fs.rename(oldpath,newpath, function (err){})

                }
            }
        }
    })

    // console.log('path',files['img1'].path)
    // console.log('path',files.img1)

    // if ( typeof(files.input) != 'undefined' ){
    //  let oldpath=files.input.path;
    //       let newpath= dir + '.png' ;
    //       fs.rename(oldpath,newpath, function (err){

    //if (err) console.log('error : ',err);

    if (callback){callback('err')};

    return 'err';
    // })
}

exports.uploadFile=uploadFile;
exports.uploadMultiFile=uploadMultiFile;
exports.uploaddoc=uploaddoc;
