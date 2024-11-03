import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import "@splidejs/splide/css";
import { Splide , SplideSlide} from "@splidejs/react-splide";
import { generateClient } from "aws-amplify/api";
//import {StorageManager} from '@aws-amplify/ui-react-storage';
import { uploadData} from 'aws-amplify/storage';
import { downloadData } from 'aws-amplify/storage';
import { remove } from 'aws-amplify/storage';
import Storage from 'aws-amplify/storage';
import { getUrl } from "aws-amplify/storage";
import { getCurrentUser } from 'aws-amplify/auth';
import mapicon from './map.png'
import phoneicon from './phone.png'
import texticon from './text.png'
import urlicon from './url.png'
import emailicon from './email.png'

import { UpdateMyItem } from './ui-components';
import { autoSignIn, signOut } from "aws-amplify/auth";
import Resizer from "react-image-file-resizer";

import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  TextField,
  View,
  Menu,
  MenuItem,
  Collection,
  Card,
  Divider,
  SelectField,
  Badge,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { itemByEmailAndTitle, itemByLatitudeAndLongitude, itemsByEmail, itemsByUserid, listItems } from "./graphql/queries";
import {
  createItem as createItemMutation,
  deleteItem as deleteItemMutation,
  updateItem as updateItemMutation,
} from "./graphql/mutations";
import * as amplifyconfig from './amplifyconfiguration.json';
import {Amplify} from 'aws-amplify';
Amplify.configure(amplifyconfig);

const client = generateClient();
var curLongitude;
var curLatitude;
const styles = {
  width:"300",
  objectFit: 'contain',
};
const iconstyles = {
  float: "none",
  paddingLeft: "20px",
  paddingRight: "20px",
};
const App = ({ signOut }) => {
  const [items, setItems] = useState([]);
  const [userAction, setUserAction] = useState("search");
 const [itemIndex, setItemIndex] = useState(0);
  const [userid, setUserID] = useState("");
  const [file, setFile] = useState();
  const [file2, setFile2] = useState();
  const [file3, setFile3] = useState();
  const [file4, setFile4] = useState();
  const [file5, setFile5] = useState();
  const [previewFile, setPreviewFile] = useState();
  const [previewFile2, setPreviewFile2] = useState();
  const [previewFile3, setPreviewFile3] = useState();
  const [previewFile4, setPreviewFile4] = useState();
  const [previewFile5, setPreviewFile5] = useState();
  const [uploadProgress1, setUploadProgress1] = useState();  //if we want to track upload progress, use this per image..not being used currently
  const [file1Changed, setFile1Changed] = useState(false);
  const [file2Changed, setFile2Changed] = useState(false);
  const [file3Changed, setFile3Changed] = useState(false);
  const [file4Changed, setFile4Changed] = useState(false);
  const [file5Changed, setFile5Changed] = useState(false);

  // useEffect(() => {
  //   getLocation();
  //   //fetchItems();
  // }, []);
  const resizeFile = (rsfile) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        rsfile,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });
    const resizeFileForPreview = (rsfile) =>
      new Promise((resolve) => {
        Resizer.imageFileResizer(
          rsfile,
          300,
          300,
          "JPEG",
          100,
          0,
          (uri) => {
            resolve(uri);
          },
          "base64"
        );
      });
  const handleChange = async (e) => {
    try{
      const file1 = e.target.files[0];
      const image1 = await resizeFile(file1);
      setFile(image1);
      const previewImage1 = await resizeFileForPreview(file1);
      setPreviewFile(previewImage1);
      setFile1Changed(true);
    }
    catch(err) {
      console.log(err);
    }
  }
  const handleChange2 = async (e) => {
    try{
      const file2 = e.target.files[0];
      const image2 = await resizeFile(file2);
      setFile2(image2);
      const previewImage2 = await resizeFileForPreview(file2);
      setPreviewFile2(previewImage2);
      setFile2Changed(true);
    }
    catch(err) {
      console.log(err);
    }
  }
  const handleChange3 = async (e) => {
    try{
      const file3 = e.target.files[0];
      const image3 = await resizeFile(file3);
      setFile3(image3);
      const previewImage3 = await resizeFileForPreview(file3);
      setPreviewFile3(previewImage3);
      setFile3Changed(true);
    }
    catch(err) {
      console.log(err);
    }
  }
  const handleChange4 = async (e) => {
    try{
      const file4 = e.target.files[0];
      const image4 = await resizeFile(file4);
      setFile4(image4);
      const previewImage4 = await resizeFileForPreview(file4);
      setPreviewFile4(previewImage4);
      setFile4Changed(true);
    }
    catch(err) {
      console.log(err);
    }
  }
  const handleChange5 = async (e) => {
    try{
      const file5 = e.target.files[0];
      const image5 = await resizeFile(file5);
      setFile5(image5);
      const previewImage5 = await resizeFileForPreview(file5);
      setPreviewFile5(previewImage5);
      setFile5Changed(true);
    }
    catch(err) {
      console.log(err);
    }
  }
    // function handleChange(e) {
    //     var fileInput = false;
    //     if(e.target.files[0])
    //       {
    //         fileInput = true;
    //       }
    //     if(fileInput){
    //       try {
    //         Resizer.imageFileResizer(
    //           e.target.files[0],
    //           300,
    //           300,
    //           "JPEG",
    //           100,
    //           0,
    //           (uri) => {
    //             console.log(uri);
                
    //             setFile(uri);
    //           },
    //           "base64",
    //           200,
    //           200
    //         );
    //       } catch (err) {
    //         console.log(err);
    //       }
    //     }
        

    //}
//     function handleChange2(e) {
      
//       var fileInput = false;
//         if(e.target.files[0]){fileInput = true;}
//         if(fileInput){
//           try {
//             Resizer.imageFileResizer(
//               e.target.files[0],
//               300,
//               300,
//               "JPEG",
//               100,
//               0,
//               (uri) => {
//                 console.log(uri);
                
//                 setFile2(uri);
//               },
//               "base64",
//               200,
//               200
//             );
//           } catch (err) {
//             console.log(err);
//           }
//         }
//   }
//   function handleChange3(e) {
//     var fileInput = false;
//     if(e.target.files[0]){fileInput = true;}
//     if(fileInput){
//       try {
//         Resizer.imageFileResizer(
//           e.target.files[0],
//           300,
//           300,
//           "JPEG",
//           100,
//           0,
//           (uri) => {
//             console.log(uri);
            
//             setFile3(uri);
//           },
//           "base64",
//           200,
//           200
//         );
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     //setFile3(URL.createObjectURL(e.target.files[0]));
// }
// function handleChange4(e) {
//   var fileInput = false;
//         if(e.target.files[0]){fileInput = true;}
//         if(fileInput){
//           try {
//             Resizer.imageFileResizer(
//               e.target.files[0],
//               300,
//               300,
//               "JPEG",
//               100,
//               0,
//               (uri) => {
//                 console.log(uri);
                
//                 setFile4(uri);
//               },
//               "base64",
//               200,
//               200
//             );
//           } catch (err) {
//             console.log(err);
//           }
//         }
//   //setFile4(URL.createObjectURL(e.target.files[0]));
// }
// function handleChange5(e) {
//   var fileInput = false;
//         if(e.target.files[0]){fileInput = true;}
//         if(fileInput){
//           try {
//             Resizer.imageFileResizer(
//               e.target.files[0],
//               300,
//               300,
//               "JPEG",
//               100,
//               0,
//               (uri) => {
//                 console.log(uri);
                
//                 setFile(uri);
//               },
//               "base64",
//               200,
//               200
//             );
//           } catch (err) {
//             console.log(err);
//           }
//         }
//   //setFile5(URL.createObjectURL(e.target.files[0]));
// }

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

 function showPosition(position) {
  curLatitude = Math.round(position.coords.latitude * 100) ;
  curLongitude = Math.round(position.coords.longitude * 100);
  //console.log("Latitude: " + position.coords.latitude +
  //"Longitude: " + position.coords.longitude)
  fetchItems();
}

  async function fetchItems() {
    console.log('fetchItems fired');
    //await getLocation();
//the longitude is using a sortkey and can use a between to find all within the range of +-1 from current users longitude rounded to two decimals and stored as whole number integer
//because you can only search in dynamodb with a most two filters at once, run the latitude query three times passing in +1 and -1 and = current latitude of user
      const apiDataEqualLat = await client.graphql({
       query: itemByLatitudeAndLongitude, variables: { longitude: {between: [parseInt(curLongitude) - 1, parseInt(curLongitude) + 1]}, latitude : parseInt(curLatitude) } } 
     );
     var itemsFromAPIEqualLat = apiDataEqualLat.data.itemByLatitudeAndLongitude.items;

     const apiDataPlusOneLat = await client.graphql({
      query: itemByLatitudeAndLongitude, variables: { longitude: {between: [parseInt(curLongitude) - 1, parseInt(curLongitude) + 1]}, latitude : parseInt(curLatitude) + 1 } } 
    );
    var itemsFromAPIPlusOneLat = apiDataPlusOneLat.data.itemByLatitudeAndLongitude.items;

    const apiDataMinusOneLat = await client.graphql({
      query: itemByLatitudeAndLongitude, variables: { longitude: {between: [parseInt(curLongitude) - 1, parseInt(curLongitude) + 1]}, latitude : parseInt(curLatitude) - 1 } } 
    );
    var itemsFromAPIMinusOneLat = apiDataMinusOneLat.data.itemByLatitudeAndLongitude.items;

    //console.log(itemsFromAPIEqualLat);
    //console.log(itemsFromAPIPlusOneLat);
    //console.log(itemsFromAPIMinusOneLat);

    //add all the returned data into a single array and show it
    itemsFromAPIEqualLat=itemsFromAPIEqualLat.concat(itemsFromAPIPlusOneLat);
    itemsFromAPIEqualLat=itemsFromAPIEqualLat.concat(itemsFromAPIMinusOneLat);

    await Promise.all(
      itemsFromAPIEqualLat.map(async (item) => {
        if (item.image) {
          const getUrlResult = await getUrl({
            key: item.image,
            options: {
              accessLevel: 'guest'  // can be 'private', 'protected', or 'guest' but defaults to `guest`
            },
          });
            item.image = getUrlResult.url;
        }
        if (item.image2) {
          const getUrlResult = await getUrl({
            key: item.image2,
            options: {
              accessLevel: 'guest'  // can be 'private', 'protected', or 'guest' but defaults to `guest`
            },
          });
            item.image2 = getUrlResult.url;
        }
        if (item.image3) {
          const getUrlResult = await getUrl({
            key: item.image3,
            options: {
              accessLevel: 'guest'  // can be 'private', 'protected', or 'guest' but defaults to `guest`
            },
          });
            item.image3 = getUrlResult.url;
        }
        if (item.image4) {
          const getUrlResult = await getUrl({
            key: item.image4,
            options: {
              accessLevel: 'guest'  // can be 'private', 'protected', or 'guest' but defaults to `guest`
            },
          });
            item.image4 = getUrlResult.url;
        }
        if (item.image5) {
          const getUrlResult = await getUrl({
            key: item.image5,
            options: {
              accessLevel: 'guest'  // can be 'private', 'protected', or 'guest' but defaults to `guest`
            },
          });
            item.image5 = getUrlResult.url;
        }
        return item;
      })
    );
    setItems(itemsFromAPIEqualLat);
  }

  async function fetchMyItems() {
    const { username, userId, signInDetails } = await getCurrentUser();
    setUserID(userId);

      const apiDataForUser = await client.graphql({
       query: itemsByUserid, variables: { userid: userId } } 
     );
     var itemsFromAPIUserID = apiDataForUser.data.itemsByUserid.items;
//console.log(itemsFromAPIUserID);
//console.log('my user id is: ' + userId);

    await Promise.all(
      itemsFromAPIUserID.map(async (item) => {
        if (item.image) {
          const getUrlResult = await getUrl({
            key: item.image,
            options: {
              accessLevel: 'guest'  // can be 'private', 'protected', or 'guest' but defaults to `guest`
            },
          });
            item.image = getUrlResult.url;
        }
        if (item.image2) {
          const getUrlResult = await getUrl({
            key: item.image2,
            options: {
              accessLevel: 'guest'  // can be 'private', 'protected', or 'guest' but defaults to `guest`
            },
          });
            item.image2 = getUrlResult.url;
        }
        if (item.image3) {
          const getUrlResult = await getUrl({
            key: item.image3,
            options: {
              accessLevel: 'guest'  // can be 'private', 'protected', or 'guest' but defaults to `guest`
            },
          });
            item.image3 = getUrlResult.url;
        }
        if (item.image4) {
          const getUrlResult = await getUrl({
            key: item.image4,
            options: {
              accessLevel: 'guest'  // can be 'private', 'protected', or 'guest' but defaults to `guest`
            },
          });
            item.image4 = getUrlResult.url;
        }
        if (item.image5) {
          const getUrlResult = await getUrl({
            key: item.image5,
            options: {
              accessLevel: 'guest'  // can be 'private', 'protected', or 'guest' but defaults to `guest`
            },
          });
            item.image5 = getUrlResult.url;
        }
        return item;
      })
    );
    setItems(itemsFromAPIUserID);
  }
async function updateItem(event){
  setUserAction("myitems");
  event.preventDefault();
  const form = new FormData(event.target);
    const image = form.get("image");
    const image2 = form.get("image2");
    const image3 = form.get("image3");
    const image4 = form.get("image4");
    const image5 = form.get("image5");
  const data = {
    id: items[itemIndex].id,
    title: form.get("title"),
    description: form.get("description"),
    price: form.get("price"),
    latitude: curLatitude,
    longitude: curLongitude,
    image: image.name,
    image2: image2.name,
    image3: image3.name,
    image4: image4.name,
    image5: image5.name,
    email: form.get("email"),
    phone: form.get("phone"),
    text: form.get("text"),
    url: form.get("url"),
    category: form.get("category"),
    address1: form.get("address1"),
      city: form.get("city"),
      state: form.get("state"),
    //userid: userId,
  };
console.log('image1 name' + image.name);
console.log('image2 name' + image2.name);
console.log('image3 name' + image3.name);
console.log('image4 name' + image4.name);
console.log('image5 name' + image5.name);

  if (!!data.image && file1Changed) 
    {
      const { v4: uuidv4 } = require('uuid');
      var fileName;
      fileName = uuidv4();
      fileName += ".jpg";
      data.image = fileName;
      data.bucketkey = fileName;

      const result = await uploadData({
        key: fileName,
        data: file,
        options: {
          accessLevel: 'guest' // defaults to `guest` but can be 'private' | 'protected' | 'guest'
          // onProgress: ({ transferredBytes, totalBytes }) => {
          //   if (totalBytes) {
          //         const progress1 = Math.round((transferredBytes / totalBytes) * 100);
          //         setUploadProgress1(progress1);
          //       };
          //   } 
        }
      }).result;
    }
    else
    {
      data.image = items[itemIndex].bucketkey;
      data.bucketkey = items[itemIndex].bucketkey;
    }
    if (!!data.image2 && file2Changed) 
    {
      const { v4: uuidv4 } = require('uuid');
      var fileName2;
      fileName2 = uuidv4();
      fileName2 += ".jpg";
      data.image2 = fileName2;
      data.bucketkey2 = fileName2;

      const result = await uploadData({
        key: fileName2,
        data: file2,
        options: {
          accessLevel: 'guest' // defaults to `guest` but can be 'private' | 'protected' | 'guest'
          //onProgress // Optional progress callback.
        }
      }).result;
    }
    else
    {
      data.image2 = items[itemIndex].bucketkey2;
      data.bucketkey2 = items[itemIndex].bucketkey2;
    }
    if (!!data.image3 && file3Changed) 
    {
      const { v4: uuidv4 } = require('uuid');
      var fileName3;
      fileName3 = uuidv4();
      fileName3 += ".jpg";
      data.image3 = fileName3;
      data.bucketkey3 = fileName3;

      const result = await uploadData({
        key: fileName3,
        data: file3,
        options: {
          accessLevel: 'guest' // defaults to `guest` but can be 'private' | 'protected' | 'guest'
          //onProgress // Optional progress callback.
        }
      }).result;
    }
    else
    {
      data.image3 = items[itemIndex].bucketkey3;
      data.bucketkey3 = items[itemIndex].bucketkey3;
    }
    if (!!data.image4 && file4Changed) 
    {
      const { v4: uuidv4 } = require('uuid');
      var fileName4;
      fileName4 = uuidv4();
      fileName4 += ".jpg";
      data.image4 = fileName4;
      data.bucketkey4 = fileName4;

      const result = await uploadData({
        key: fileName4,
        data: file4,
        options: {
          accessLevel: 'guest' // defaults to `guest` but can be 'private' | 'protected' | 'guest'
          //onProgress // Optional progress callback.
        }
      }).result;
    }
    else
    {
      data.image4 = items[itemIndex].bucketkey4;
      data.bucketkey4 = items[itemIndex].bucketkey4;
    }
    if (!!data.image5 && file5Changed) 
    {
      const { v4: uuidv4 } = require('uuid');
      var fileName5;
      fileName5 = uuidv4();
      fileName5 += ".jpg";
      data.image5 = fileName5;
      data.bucketkey5 = fileName5;

      const result = await uploadData({
        key: fileName5,
        data: file5,
        options: {
          accessLevel: 'guest' // defaults to `guest` but can be 'private' | 'protected' | 'guest'
          //onProgress // Optional progress callback.
        }
      }).result;
    }
    else
    {
      data.image5 = items[itemIndex].bucketkey5;
      data.bucketkey5 = items[itemIndex].bucketkey5;
    }

  await client.graphql({
    query: updateItemMutation,
    variables: { input: data },
  });
  setFile1Changed(false);
  setFile2Changed(false);
  setFile3Changed(false);
  setFile4Changed(false);
  setFile5Changed(false);
  fetchMyItems();
  event.target.reset();
}
  async function createItem(event) {
    setUserAction("create");
    event.preventDefault();
    //return;
    const form = new FormData(event.target);
    const image = form.get("image");
    const image2 = form.get("image2");
    const image3 = form.get("image3");
    const image4 = form.get("image4");
    const image5 = form.get("image5");
    //const image = document.getElementById("image");

    const { username, userId, signInDetails } = await getCurrentUser();
    //alert(userId);
 

    const data = {
      title: form.get("title"),
      description: form.get("description"),
      price: form.get("price"),
      latitude: curLatitude,
      longitude: curLongitude,
      image: image.name,
      image2: image2.name,
      image3: image3.name,
      image4: image4.name,
      image5: image5.name,
      email: form.get("email"),
      phone: form.get("phone"),
      text: form.get("text"),
      url: form.get("url"),
      category: form.get("category"),
      userid: userId,
      address1: form.get("address1"),
      city: form.get("city"),
      state: form.get("state"),
    };
    
    if (!!data.image) 
    {
      const { v4: uuidv4 } = require('uuid');
      var fileName;
      fileName = uuidv4();
      fileName += ".jpg";
      data.image = fileName;
      data.bucketkey = fileName;

      const result = await uploadData({
        key: fileName,
        data: file,
        options: {
          accessLevel: 'guest' // defaults to `guest` but can be 'private' | 'protected' | 'guest'
          //onProgress // Optional progress callback.
        }
      }).result;
    }
    if (!!data.image2) 
    {
      const { v4: uuidv4 } = require('uuid');
      var fileName2;
      fileName2 = uuidv4();
      fileName2 += ".jpg";
      data.image2 = fileName2;
      data.bucketkey2 = fileName2;

      const result = await uploadData({
        key: fileName2,
        data: file2,
        options: {
          accessLevel: 'guest' // defaults to `guest` but can be 'private' | 'protected' | 'guest'
          //onProgress // Optional progress callback.
        }
      }).result;
    }
    if (!!data.image3) 
    {
      const { v4: uuidv4 } = require('uuid');
      var fileName3;
      fileName3 = uuidv4();
      fileName3 += ".jpg";
      data.image3 = fileName3;
      data.bucketkey3 = fileName3;

      const result = await uploadData({
        key: fileName3,
        data: file3,
        options: {
          accessLevel: 'guest' // defaults to `guest` but can be 'private' | 'protected' | 'guest'
          //onProgress // Optional progress callback.
        }
      }).result;
    }
    if (!!data.image4) 
    {
      const { v4: uuidv4 } = require('uuid');
      var fileName4;
      fileName4 = uuidv4();
      fileName4 += ".jpg";
      data.image4 = fileName4;
      data.bucketkey4 = fileName4;

      const result = await uploadData({
        key: fileName4,
        data: file4,
        options: {
          accessLevel: 'guest' // defaults to `guest` but can be 'private' | 'protected' | 'guest'
          //onProgress // Optional progress callback.
        }
      }).result;
    }
    if (!!data.image5) 
    {
      const { v4: uuidv4 } = require('uuid');
      var fileName5;
      fileName5 = uuidv4();
      fileName5 += ".jpg";
      data.image5 = fileName5;
      data.bucketkey5 = fileName5;

      const result = await uploadData({
        key: fileName5,
        data: file5,
        options: {
          accessLevel: 'guest' // defaults to `guest` but can be 'private' | 'protected' | 'guest'
          //onProgress // Optional progress callback.
        }
      }).result;
    }
    await client.graphql({
      query: createItemMutation,
      variables: { input: data },
    });
    fetchItems();
    event.target.reset();
  }

  async function deleteItem({ id, title, image, bucketkey }) {
    
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    //console.log(image);
    await remove({key: bucketkey});
    await client.graphql({
      query: deleteItemMutation,
      variables: { input: { id } },
    });
  }
  function showCreateItem() {
    //if not logged in, take to account page otherwise open for creation
    getLocation();
    setUserAction("create");
    
  }
  function showFetchingItem() {
    
    getLocation();
    setUserAction("search");
  }
  function showMyItems() {
    //if not logged in, take to account page otherwise open my items
    fetchMyItems();
    setUserAction("myitems");
    
  }
  function showUpdateItem(index) {
    setItemIndex(index);
    //console.log(index);
    setUserAction("update");
    
  }

  async function showSignOut(){
      try {
        await signOut();
      } catch (error) {
        console.log('error signing out: ', error);
      }
    setUserID(null);
    showFetchingItem();
  }
  function ismyitem(index)
  {
    console.log(userid + ' ' + items[index].userid);
    if(userid == items[index].userid) return true; else return false;
   
  }
  function mapsSelector(addr1, city, state) {
   
    if /* if we're on iOS, open in Apple Maps */
    
      ((navigator.platform.indexOf("iPhone") != -1) || 
       (navigator.platform.indexOf("iPad") != -1) || 
       (navigator.platform.indexOf("iPod") != -1))
       {
 
      window.open("maps://maps.google.com/maps?daddr=" + addr1 + "," + city + " " + state + "&amp};ll=");
  }
  else /* else use Google */
  {
 
      window.open("https://maps.google.com/maps?daddr=" + addr1 + "," + city + " " + state + "&amp};ll=");
  }
  }
  return (
    
     <View className="App">
      <Menu>
        <MenuItem onClick={() => showFetchingItem()}>Search</MenuItem>
        <MenuItem onClick={() => showCreateItem()}>Create</MenuItem>
        <MenuItem onClick={() => showMyItems()}>My Items</MenuItem>
        <MenuItem onClick={() => showSignOut()}>Log Out</MenuItem>
      </Menu>
      <Heading level={1}>signGrabber</Heading>
      {userAction == "menu" &&
        <Heading padding="medium">Please select a menu option from above</Heading>
      }
      {userAction == "create" && !userid && 
        <autoSignIn/> }
      {userAction == "create" &&
        <View as="form" margin="3rem 0" onSubmit={createItem}>
         <Flex direction="column" justifyContent="center">
           <TextField
             name="title"
             placeholder="Title"
             label="Title"
             labelHidden
             variation="quiet"
             required
           />
           <TextField
             name="description"
             placeholder="Description"
             label="Description"
             labelHidden
             variation="quiet"
             required
           />
           <TextField
             name="price"
             placeholder="Price"
             label="Price"
             labelHidden
             variation="quiet"
             required
           />
           <TextField
            name="text"
            placeholder="Text"
            label="Text"
            labelHidden
            variation="quiet"
            required
            />
           <TextField
             name="email"
             placeholder="Email"
             label="Email"
             labelHidden
             variation="quiet"
             required
           />
           <TextField
             name="phone"
             placeholder="Phone"
             label="Phone"
             labelHidden
             variation="quiet"
             required
           />
           <TextField
             name="address1"
             placeholder="Address1"
             label="Address1"
             labelHidden
             variation="quiet"
             required
           />
           <TextField
             name="city"
             placeholder="City"
             label="City"
             labelHidden
             variation="quiet"
             required
           />
           <TextField
             name="state"
             placeholder="State"
             label="State"
             labelHidden
             variation="quiet"
             required
           />
           <TextField
             name="url"
             placeholder="Web Address"
             label="Web Address"
             labelHidden
             variation="quiet"
             required
           />
           <SelectField
            label="Category" name="category">
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
            <option value="For Lease">For Lease</option>
            <option value="Help Wanted">Help Wanted</option>
            <option value="Garage Sale">Garage Sale</option>
            <option value="Event">Event</option>
            </SelectField>
           <TextField
             name="latitude"
             id="latitude"
             placeholder="Latitude"
             label="Latitude"
             labelHidden
             variation="quiet"

           />
           <TextField
             name="longitude"
             id="longitude"
             placeholder="Longitude"
             label="Longitude"
             labelHidden
             variation="quiet"

           />
           <View>
         
            </View>
           <View
             name="image"
             as="input"
             type="file"
             style={styles}
             onChange={handleChange}
           />
           <Flex direction="column" justifyContent="center">
            <img src={previewFile} style={styles}/>
            </Flex>
           <View
             name="image2"
             as="input"
             type="file"
             style={styles}
             onChange={handleChange2}
           />
           <Flex direction="column" justifyContent="center">
            <img src={previewFile2} style={styles}/>
            </Flex>
           <View
             name="image3"
             as="input"
             type="file"
             style={styles}
             onChange={handleChange3}
           />
           <Flex direction="column" justifyContent="center">
            <img src={previewFile3} style={styles}/>
            </Flex>
           <View
             name="image4"
             as="input"
             type="file"
             style={styles}
             onChange={handleChange4}
           />
           <Flex direction="column" justifyContent="center">
            <img src={previewFile4} style={styles}/>
            </Flex>
           <View
             name="image5"
             as="input"
             type="file"
             style={styles}
             onChange={handleChange5}
           />
           <Flex direction="column" justifyContent="center">
            <img src={previewFile5} style={styles}/>
            </Flex>
           <Button type="submit" variation="primary">
             Create Item
           </Button>
            </Flex>
        </View>
      }
      
      {(userAction == "search" || userAction == "myitems") &&


    /*   <div>
      <View margin="3rem 0">
      {items.map((item) => (
  <Flex
    key={item.id || item.title}
    direction="row"
    justifyContent="center"
    alignItems="center"
  >{item.image && (
    <Image
      src= {item.image}
      alt={`visual aid for ${items.item}`}
      style={{ width: 400 }}
    />
  )}
    <Text as="strong" fontWeight={700}>
      {item.title}
    </Text>
    <Text as="span">{item.description}</Text>
    
    <Button variation="link" onClick={() => deleteItem(item)}>
      Delete Item
    </Button>
  </Flex>
))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
      </div> */
      
      <Collection
        items={items}
        type="list"
        direction="row"
        gap="20px"
        wrap="wrap"
      >
      {(item, index) => (
      <Card
        key={index}
        borderRadius="medium"
        maxWidth="100%"
        variation="outlined"
      >
      {/* <Image
        src={item.image}
        alt=""
      /> */}
      <Splide
        options={ {
        rewind: true,
        gap   : '1rem',
      } }
      aria-label="My Favorite Images"
      >
      <SplideSlide>
        <img src={item.image} alt="Image 1" style={styles}/>
      </SplideSlide>
      <SplideSlide>
        <img src={item.image2} alt="Image 2" style={styles}/>
      </SplideSlide>
      <SplideSlide>
        <img src={item.image3} alt="Image 3" style={styles}/>
      </SplideSlide>
      <SplideSlide>
        <img src={item.image4} alt="Image 4" style={styles}/>
      </SplideSlide>
      <SplideSlide>
        <img src={item.image5} alt="Image 5" style={styles}/>
      </SplideSlide>
    </Splide>
      <View padding="xs">
      <Flex>
          
            <Badge
              key={"category"}
              backgroundColor={
                'blue.40'}
            >
              {item.category}
            </Badge>
            <Badge
              key={"price"}
              backgroundColor={
                'green.40'}
            >
              ${item.price}
            </Badge>
        </Flex>
        <Divider padding="xs" />
        <Heading padding="medium">{item.title}</Heading>
        <Heading padding="small">{item.description}</Heading>
        <Heading >
        <a style={iconstyles} href={`tel:${item.phone}`}><img  src={phoneicon} width = "25" height = "25"></img></a>
        <a style={iconstyles} href={`sms:${item.text}`}><img  src={texticon} width = "25" height = "25"></img></a>
        <a style={iconstyles} href={`mailto:${item.email}`}><img  src={emailicon} width = "25" height = "25"></img></a>
        <a style={iconstyles} href={`${item.url}`}><img  src={urlicon} width = "25" height = "25"></img></a>
        <img  src={mapicon} width = "25" height = "25" onClick={() => mapsSelector(item.addr1, item.city, item.state)}/>
        </Heading>
        {ismyitem(index) && 
          <Button variation="primary" isFullWidth onClick = {() => showUpdateItem(index)}>
            Edit
          </Button>
        }
      </View>
    </Card>
  )}
      </Collection>
  }
    {userAction == "update" && 
    <View as="form" margin="3rem 0" onSubmit={updateItem}>
      <Flex direction="column" justifyContent="center">
<TextField
name="title"
placeholder="Title"
label="Title"
labelHidden
variation="quiet"
defaultValue={items[itemIndex].title}
required
/>
<TextField
name="description"
placeholder="Description"
label="Description"
labelHidden
variation="quiet"
defaultValue={items[itemIndex].description}
required
/>
<TextField
name="price"
placeholder="Price"
label="Price"
labelHidden
variation="quiet"
defaultValue={items[itemIndex].price}
required
/>
<TextField
name="text"
placeholder="Text"
label="Text"
labelHidden
variation="quiet"
defaultValue={items[itemIndex].text}
required
/>
<TextField
name="email"
placeholder="Email"
label="Email"
labelHidden
variation="quiet"
defaultValue={items[itemIndex].email}
required
/>
<TextField
name="phone"
placeholder="Phone"
label="Phone"
labelHidden
variation="quiet"
defaultValue={items[itemIndex].phone}
required
/>
<TextField
name="address1"
placeholder="Address1"
label="Address1"
labelHidden
variation="quiet"
defaultValue={items[itemIndex].address1}
required
/>
<TextField
name="city"
placeholder="City"
label="City"
labelHidden
variation="quiet"
defaultValue={items[itemIndex].city}
required
/>
<TextField
name="state"
placeholder="State"
label="State"
labelHidden
variation="quiet"
defaultValue={items[itemIndex].state}
required
/>
<TextField
name="text"
placeholder="Text"
label="Text"
labelHidden
variation="quiet"
defaultValue={items[itemIndex].text}
required
/>
<TextField
name="url"
placeholder="Web Address"
label="Web Address"
labelHidden
variation="quiet"
defaultValue={items[itemIndex].url}
required
/>
<SelectField
label="Category" name="category">
<option value="For Sale">For Sale</option>
<option value="For Rent">For Rent</option>
<option value="For Lease">For Lease</option>
<option value="Help Wanted">Help Wanted</option>
<option value="Garage Sale">Garage Sale</option>
<option value="Event">Event</option>
defaultValue={items[itemIndex].category}
</SelectField>
<TextField
name="latitude"
id="latitude"
placeholder="Latitude"
label="Latitude"
labelHidden
variation="quiet"
defaultValue={items[itemIndex].latitude}
required
/>
<TextField
name="longitude"
id="longitude"
placeholder="Longitude"
label="Longitude"
labelHidden
variation="quiet"
defaultValue={items[itemIndex].longitude}
required
/>
  
  {/* <Image
        src={items[itemIndex].image}
        alt=""
      />
      <View
        name="image"
        as="input"
        type="file"
        style={{ alignSelf: "end" }}
      />
  <Image
        src={items[itemIndex].image2}
        alt=""
      />
      <View
        name="image2"
        as="input"
        type="file"
        style={{ alignSelf: "end" }}
      />
  <Image
        src={items[itemIndex].image3}
        alt=""
      />
      <View
        name="image3"
        as="input"
        type="file"
        style={{ alignSelf: "end" }}
      />
  <Image
        src={items[itemIndex].image4}
        alt=""
      />
      <View
        name="image4"
        as="input"
        type="file"
        style={{ alignSelf: "end" }}
      />
  <Image
        src={items[itemIndex].image5}
        alt=""
      />
      <View
        name="image5"
        as="input"
        type="file"
        style={{ alignSelf: "end" }}
      /> */}
      <View
        name="image"
        as="input"
        type="file"
        style={styles}
        onChange={handleChange}
      />
      {file1Changed &&
      <Flex direction="row" justifyContent="center">
        <img src={previewFile} style={styles}/>
      </Flex>
      }
      <Flex direction="row" justifyContent="center">
        <img src={items[itemIndex].image} style={styles}/>
      </Flex>
      <View
        name="image2"
        as="input"
        type="file"
        style={styles}
        onChange={handleChange2}
      />
      {file2Changed && 
      <Flex direction="row" justifyContent="center">
        <img src={previewFile2} style={styles}/>
      </Flex>
      }
      <Flex direction="row" justifyContent="center">
        <img src={items[itemIndex].image2} style={styles}/>
      </Flex>
      <View
        name="image3"
        as="input"
        type="file"
        style={styles}
        onChange={handleChange3}
      />
      {file3Changed && 
      <Flex direction="row" justifyContent="center">
        <img src={previewFile3} style={styles}/>
      </Flex>
      }
      <Flex direction="row" justifyContent="center">
        <img src={items[itemIndex].image3} style={styles}/>
      </Flex>
      <View
        name="image4"
        as="input"
        type="file"
        style={styles}
        onChange={handleChange4}
      />
      {file4Changed && 
      <Flex direction="row" justifyContent="center">
        <img src={previewFile4} style={styles}/>
      </Flex>
      }
      <Flex direction="row" justifyContent="center">
        <img src={items[itemIndex].image4} style={styles}/>
      </Flex>
      <View
        name="image5"
        as="input"
        type="file"
        style={styles}
        onChange={handleChange5}
      />
      {file5Changed && 
      <Flex direction="row" justifyContent="center">
        <img src={previewFile5} style={styles}/>
      </Flex>
      }
      <Flex direction="row" justifyContent="center">
        <img src={items[itemIndex].image5} style={styles}/>
      </Flex>
      <Button type="submit" variation="primary">
        Update Item
      </Button>
    </Flex>
  </View>
  
  
  
}
    </View>
    

   );
};

export default withAuthenticator(App);