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
import mapicon from './mapIcon.png'
import { UpdateMyItem } from './ui-components';
import { autoSignIn, signOut } from "aws-amplify/auth";

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
  width:"100%",
  objectFit: 'contain',
};

const App = ({ signOut }) => {
  const [items, setItems] = useState([]);
  const [userAction, setUserAction] = useState("search");
 const [itemIndex, setItemIndex] = useState(0);
  const [userid, setUserID] = useState("");
  const [file, setFile] = useState();
const [longi, setLongi] = useState();
const [lati, setLati] = useState();

  // useEffect(() => {
  //   getLocation();
  //   //fetchItems();
  // }, []);
  
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
 
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
  setLati(curLatitude);
  setLongi(curLongitude);
  alert(curLatitude);
  alert(curLongitude);
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
        return item;
      })
    );
    setItems(itemsFromAPIUserID);
  }
async function updateItem(event){
  setUserAction("myitems");
  event.preventDefault();
  const form = new FormData(event.target);
  const data = {
    id: items[itemIndex].id,
    title: form.get("title"),
    description: form.get("description"),
    price: form.get("price"),
    latitude: lati,
    longitude: longi,
    // image: image.name,
    // image2: image2.name,
    // image3: image3.name,
    // image4: image4.name,
    // image5: image5.name,
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
  await client.graphql({
    query: updateItemMutation,
    variables: { input: data },
  });
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
    alert(lati);
    alert(longi);

    const data = {
      title: form.get("title"),
      description: form.get("description"),
      price: form.get("price"),
      latitude: lati,
      longitude: longi,
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
        data: image,
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
        data: image2,
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
        data: image3,
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
        data: image4,
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
        data: image5,
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
            <img src={file} style={styles}/>
         </Flex>
           <View
             name="image2"
             as="input"
             type="file"
             style={{ alignSelf: "end" }}
           />
           <View
             name="image3"
             as="input"
             type="file"
             style={{ alignSelf: "end" }}
           />
           <View
             name="image4"
             as="input"
             type="file"
             style={{ alignSelf: "end" }}
           />
           <View
             name="image5"
             as="input"
             type="file"
             style={{ alignSelf: "end" }}
           />
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
        <Heading padding="small"><a href={`tel:${item.phone}`}>Call</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href={`sms:${item.text}`}>Text</a></Heading>
        <Heading padding="small"><a href={`mailto:${item.email}`}>Email</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href={`${item.url}`}>More Info</a></Heading>
        <Heading padding="small"><img src={mapicon} width = "50" height = "50" onClick={() => mapsSelector(item.addr1, item.city, item.state)}/></Heading>
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

      />
      <TextField
        name="longitude"
        id="longitude"
        placeholder="Longitude"
        label="Longitude"
        labelHidden
        variation="quiet"
        defaultValue={items[itemIndex].longitude}

      />
  <Image
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
      />
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