/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getItem } from "../graphql/queries";
import { updateItem } from "../graphql/mutations";
const client = generateClient();
export default function ItemUpdateForm(props) {
  const {
    id: idProp,
    item: itemModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    title: "",
    description: "",
    email: "",
    phone: "",
    text: "",
    url: "",
    price: "",
    status: "",
    latitude: "",
    longitude: "",
    image: "",
    bucketkey: "",
    image2: "",
    bucketkey2: "",
    image3: "",
    bucketkey3: "",
    image4: "",
    bucketkey4: "",
    image5: "",
    bucketkey5: "",
    category: "",
    userid: "",
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [email, setEmail] = React.useState(initialValues.email);
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [text, setText] = React.useState(initialValues.text);
  const [url, setUrl] = React.useState(initialValues.url);
  const [price, setPrice] = React.useState(initialValues.price);
  const [status, setStatus] = React.useState(initialValues.status);
  const [latitude, setLatitude] = React.useState(initialValues.latitude);
  const [longitude, setLongitude] = React.useState(initialValues.longitude);
  const [image, setImage] = React.useState(initialValues.image);
  const [bucketkey, setBucketkey] = React.useState(initialValues.bucketkey);
  const [image2, setImage2] = React.useState(initialValues.image2);
  const [bucketkey2, setBucketkey2] = React.useState(initialValues.bucketkey2);
  const [image3, setImage3] = React.useState(initialValues.image3);
  const [bucketkey3, setBucketkey3] = React.useState(initialValues.bucketkey3);
  const [image4, setImage4] = React.useState(initialValues.image4);
  const [bucketkey4, setBucketkey4] = React.useState(initialValues.bucketkey4);
  const [image5, setImage5] = React.useState(initialValues.image5);
  const [bucketkey5, setBucketkey5] = React.useState(initialValues.bucketkey5);
  const [category, setCategory] = React.useState(initialValues.category);
  const [userid, setUserid] = React.useState(initialValues.userid);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = itemRecord
      ? { ...initialValues, ...itemRecord }
      : initialValues;
    setTitle(cleanValues.title);
    setDescription(cleanValues.description);
    setEmail(cleanValues.email);
    setPhone(cleanValues.phone);
    setText(cleanValues.text);
    setUrl(cleanValues.url);
    setPrice(cleanValues.price);
    setStatus(cleanValues.status);
    setLatitude(cleanValues.latitude);
    setLongitude(cleanValues.longitude);
    setImage(cleanValues.image);
    setBucketkey(cleanValues.bucketkey);
    setImage2(cleanValues.image2);
    setBucketkey2(cleanValues.bucketkey2);
    setImage3(cleanValues.image3);
    setBucketkey3(cleanValues.bucketkey3);
    setImage4(cleanValues.image4);
    setBucketkey4(cleanValues.bucketkey4);
    setImage5(cleanValues.image5);
    setBucketkey5(cleanValues.bucketkey5);
    setCategory(cleanValues.category);
    setUserid(cleanValues.userid);
    setErrors({});
  };
  const [itemRecord, setItemRecord] = React.useState(itemModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getItem.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getItem
        : itemModelProp;
      setItemRecord(record);
    };
    queryData();
  }, [idProp, itemModelProp]);
  React.useEffect(resetStateValues, [itemRecord]);
  const validations = {
    title: [],
    description: [],
    email: [{ type: "Required" }],
    phone: [],
    text: [],
    url: [],
    price: [],
    status: [],
    latitude: [{ type: "Required" }],
    longitude: [{ type: "Required" }],
    image: [],
    bucketkey: [],
    image2: [],
    bucketkey2: [],
    image3: [],
    bucketkey3: [],
    image4: [],
    bucketkey4: [],
    image5: [],
    bucketkey5: [],
    category: [{ type: "Required" }],
    userid: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          title: title ?? null,
          description: description ?? null,
          email,
          phone: phone ?? null,
          text: text ?? null,
          url: url ?? null,
          price: price ?? null,
          status: status ?? null,
          latitude,
          longitude,
          image: image ?? null,
          bucketkey: bucketkey ?? null,
          image2: image2 ?? null,
          bucketkey2: bucketkey2 ?? null,
          image3: image3 ?? null,
          bucketkey3: bucketkey3 ?? null,
          image4: image4 ?? null,
          bucketkey4: bucketkey4 ?? null,
          image5: image5 ?? null,
          bucketkey5: bucketkey5 ?? null,
          category,
          userid,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateItem.replaceAll("__typename", ""),
            variables: {
              input: {
                id: itemRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ItemUpdateForm")}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={false}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title: value,
              description,
              email,
              phone,
              text,
              url,
              price,
              status,
              latitude,
              longitude,
              image,
              bucketkey,
              image2,
              bucketkey2,
              image3,
              bucketkey3,
              image4,
              bucketkey4,
              image5,
              bucketkey5,
              category,
              userid,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description: value,
              email,
              phone,
              text,
              url,
              price,
              status,
              latitude,
              longitude,
              image,
              bucketkey,
              image2,
              bucketkey2,
              image3,
              bucketkey3,
              image4,
              bucketkey4,
              image5,
              bucketkey5,
              category,
              userid,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={true}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              email: value,
              phone,
              text,
              url,
              price,
              status,
              latitude,
              longitude,
              image,
              bucketkey,
              image2,
              bucketkey2,
              image3,
              bucketkey3,
              image4,
              bucketkey4,
              image5,
              bucketkey5,
              category,
              userid,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Phone"
        isRequired={false}
        isReadOnly={false}
        value={phone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              email,
              phone: value,
              text,
              url,
              price,
              status,
              latitude,
              longitude,
              image,
              bucketkey,
              image2,
              bucketkey2,
              image3,
              bucketkey3,
              image4,
              bucketkey4,
              image5,
              bucketkey5,
              category,
              userid,
            };
            const result = onChange(modelFields);
            value = result?.phone ?? value;
          }
          if (errors.phone?.hasError) {
            runValidationTasks("phone", value);
          }
          setPhone(value);
        }}
        onBlur={() => runValidationTasks("phone", phone)}
        errorMessage={errors.phone?.errorMessage}
        hasError={errors.phone?.hasError}
        {...getOverrideProps(overrides, "phone")}
      ></TextField>
      <TextField
        label="Text"
        isRequired={false}
        isReadOnly={false}
        value={text}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              email,
              phone,
              text: value,
              url,
              price,
              status,
              latitude,
              longitude,
              image,
              bucketkey,
              image2,
              bucketkey2,
              image3,
              bucketkey3,
              image4,
              bucketkey4,
              image5,
              bucketkey5,
              category,
              userid,
            };
            const result = onChange(modelFields);
            value = result?.text ?? value;
          }
          if (errors.text?.hasError) {
            runValidationTasks("text", value);
          }
          setText(value);
        }}
        onBlur={() => runValidationTasks("text", text)}
        errorMessage={errors.text?.errorMessage}
        hasError={errors.text?.hasError}
        {...getOverrideProps(overrides, "text")}
      ></TextField>
      <TextField
        label="Url"
        isRequired={false}
        isReadOnly={false}
        value={url}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              email,
              phone,
              text,
              url: value,
              price,
              status,
              latitude,
              longitude,
              image,
              bucketkey,
              image2,
              bucketkey2,
              image3,
              bucketkey3,
              image4,
              bucketkey4,
              image5,
              bucketkey5,
              category,
              userid,
            };
            const result = onChange(modelFields);
            value = result?.url ?? value;
          }
          if (errors.url?.hasError) {
            runValidationTasks("url", value);
          }
          setUrl(value);
        }}
        onBlur={() => runValidationTasks("url", url)}
        errorMessage={errors.url?.errorMessage}
        hasError={errors.url?.hasError}
        {...getOverrideProps(overrides, "url")}
      ></TextField>
      <TextField
        label="Price"
        isRequired={false}
        isReadOnly={false}
        value={price}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              email,
              phone,
              text,
              url,
              price: value,
              status,
              latitude,
              longitude,
              image,
              bucketkey,
              image2,
              bucketkey2,
              image3,
              bucketkey3,
              image4,
              bucketkey4,
              image5,
              bucketkey5,
              category,
              userid,
            };
            const result = onChange(modelFields);
            value = result?.price ?? value;
          }
          if (errors.price?.hasError) {
            runValidationTasks("price", value);
          }
          setPrice(value);
        }}
        onBlur={() => runValidationTasks("price", price)}
        errorMessage={errors.price?.errorMessage}
        hasError={errors.price?.hasError}
        {...getOverrideProps(overrides, "price")}
      ></TextField>
      <TextField
        label="Status"
        isRequired={false}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              email,
              phone,
              text,
              url,
              price,
              status: value,
              latitude,
              longitude,
              image,
              bucketkey,
              image2,
              bucketkey2,
              image3,
              bucketkey3,
              image4,
              bucketkey4,
              image5,
              bucketkey5,
              category,
              userid,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></TextField>
      <TextField
        label="Latitude"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={latitude}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              description,
              email,
              phone,
              text,
              url,
              price,
              status,
              latitude: value,
              longitude,
              image,
              bucketkey,
              image2,
              bucketkey2,
              image3,
              bucketkey3,
              image4,
              bucketkey4,
              image5,
              bucketkey5,
              category,
              userid,
            };
            const result = onChange(modelFields);
            value = result?.latitude ?? value;
          }
          if (errors.latitude?.hasError) {
            runValidationTasks("latitude", value);
          }
          setLatitude(value);
        }}
        onBlur={() => runValidationTasks("latitude", latitude)}
        errorMessage={errors.latitude?.errorMessage}
        hasError={errors.latitude?.hasError}
        {...getOverrideProps(overrides, "latitude")}
      ></TextField>
      <TextField
        label="Longitude"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={longitude}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              description,
              email,
              phone,
              text,
              url,
              price,
              status,
              latitude,
              longitude: value,
              image,
              bucketkey,
              image2,
              bucketkey2,
              image3,
              bucketkey3,
              image4,
              bucketkey4,
              image5,
              bucketkey5,
              category,
              userid,
            };
            const result = onChange(modelFields);
            value = result?.longitude ?? value;
          }
          if (errors.longitude?.hasError) {
            runValidationTasks("longitude", value);
          }
          setLongitude(value);
        }}
        onBlur={() => runValidationTasks("longitude", longitude)}
        errorMessage={errors.longitude?.errorMessage}
        hasError={errors.longitude?.hasError}
        {...getOverrideProps(overrides, "longitude")}
      ></TextField>
      <TextField
        label="Image"
        isRequired={false}
        isReadOnly={false}
        value={image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              email,
              phone,
              text,
              url,
              price,
              status,
              latitude,
              longitude,
              image: value,
              bucketkey,
              image2,
              bucketkey2,
              image3,
              bucketkey3,
              image4,
              bucketkey4,
              image5,
              bucketkey5,
              category,
              userid,
            };
            const result = onChange(modelFields);
            value = result?.image ?? value;
          }
          if (errors.image?.hasError) {
            runValidationTasks("image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("image", image)}
        errorMessage={errors.image?.errorMessage}
        hasError={errors.image?.hasError}
        {...getOverrideProps(overrides, "image")}
      ></TextField>
      <TextField
        label="Bucketkey"
        isRequired={false}
        isReadOnly={false}
        value={bucketkey}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              email,
              phone,
              text,
              url,
              price,
              status,
              latitude,
              longitude,
              image,
              bucketkey: value,
              image2,
              bucketkey2,
              image3,
              bucketkey3,
              image4,
              bucketkey4,
              image5,
              bucketkey5,
              category,
              userid,
            };
            const result = onChange(modelFields);
            value = result?.bucketkey ?? value;
          }
          if (errors.bucketkey?.hasError) {
            runValidationTasks("bucketkey", value);
          }
          setBucketkey(value);
        }}
        onBlur={() => runValidationTasks("bucketkey", bucketkey)}
        errorMessage={errors.bucketkey?.errorMessage}
        hasError={errors.bucketkey?.hasError}
        {...getOverrideProps(overrides, "bucketkey")}
      ></TextField>
      <TextField
        label="Image2"
        isRequired={false}
        isReadOnly={false}
        value={image2}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              email,
              phone,
              text,
              url,
              price,
              status,
              latitude,
              longitude,
              image,
              bucketkey,
              image2: value,
              bucketkey2,
              image3,
              bucketkey3,
              image4,
              bucketkey4,
              image5,
              bucketkey5,
              category,
              userid,
            };
            const result = onChange(modelFields);
            value = result?.image2 ?? value;
          }
          if (errors.image2?.hasError) {
            runValidationTasks("image2", value);
          }
          setImage2(value);
        }}
        onBlur={() => runValidationTasks("image2", image2)}
        errorMessage={errors.image2?.errorMessage}
        hasError={errors.image2?.hasError}
        {...getOverrideProps(overrides, "image2")}
      ></TextField>
      <TextField
        label="Bucketkey2"
        isRequired={false}
        isReadOnly={false}
        value={bucketkey2}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              email,
              phone,
              text,
              url,
              price,
              status,
              latitude,
              longitude,
              image,
              bucketkey,
              image2,
              bucketkey2: value,
              image3,
              bucketkey3,
              image4,
              bucketkey4,
              image5,
              bucketkey5,
              category,
              userid,
            };
            const result = onChange(modelFields);
            value = result?.bucketkey2 ?? value;
          }
          if (errors.bucketkey2?.hasError) {
            runValidationTasks("bucketkey2", value);
          }
          setBucketkey2(value);
        }}
        onBlur={() => runValidationTasks("bucketkey2", bucketkey2)}
        errorMessage={errors.bucketkey2?.errorMessage}
        hasError={errors.bucketkey2?.hasError}
        {...getOverrideProps(overrides, "bucketkey2")}
      ></TextField>
      <TextField
        label="Image3"
        isRequired={false}
        isReadOnly={false}
        value={image3}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              email,
              phone,
              text,
              url,
              price,
              status,
              latitude,
              longitude,
              image,
              bucketkey,
              image2,
              bucketkey2,
              image3: value,
              bucketkey3,
              image4,
              bucketkey4,
              image5,
              bucketkey5,
              category,
              userid,
            };
            const result = onChange(modelFields);
            value = result?.image3 ?? value;
          }
          if (errors.image3?.hasError) {
            runValidationTasks("image3", value);
          }
          setImage3(value);
        }}
        onBlur={() => runValidationTasks("image3", image3)}
        errorMessage={errors.image3?.errorMessage}
        hasError={errors.image3?.hasError}
        {...getOverrideProps(overrides, "image3")}
      ></TextField>
      <TextField
        label="Bucketkey3"
        isRequired={false}
        isReadOnly={false}
        value={bucketkey3}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              email,
              phone,
              text,
              url,
              price,
              status,
              latitude,
              longitude,
              image,
              bucketkey,
              image2,
              bucketkey2,
              image3,
              bucketkey3: value,
              image4,
              bucketkey4,
              image5,
              bucketkey5,
              category,
              userid,
            };
            const result = onChange(modelFields);
            value = result?.bucketkey3 ?? value;
          }
          if (errors.bucketkey3?.hasError) {
            runValidationTasks("bucketkey3", value);
          }
          setBucketkey3(value);
        }}
        onBlur={() => runValidationTasks("bucketkey3", bucketkey3)}
        errorMessage={errors.bucketkey3?.errorMessage}
        hasError={errors.bucketkey3?.hasError}
        {...getOverrideProps(overrides, "bucketkey3")}
      ></TextField>
      <TextField
        label="Image4"
        isRequired={false}
        isReadOnly={false}
        value={image4}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              email,
              phone,
              text,
              url,
              price,
              status,
              latitude,
              longitude,
              image,
              bucketkey,
              image2,
              bucketkey2,
              image3,
              bucketkey3,
              image4: value,
              bucketkey4,
              image5,
              bucketkey5,
              category,
              userid,
            };
            const result = onChange(modelFields);
            value = result?.image4 ?? value;
          }
          if (errors.image4?.hasError) {
            runValidationTasks("image4", value);
          }
          setImage4(value);
        }}
        onBlur={() => runValidationTasks("image4", image4)}
        errorMessage={errors.image4?.errorMessage}
        hasError={errors.image4?.hasError}
        {...getOverrideProps(overrides, "image4")}
      ></TextField>
      <TextField
        label="Bucketkey4"
        isRequired={false}
        isReadOnly={false}
        value={bucketkey4}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              email,
              phone,
              text,
              url,
              price,
              status,
              latitude,
              longitude,
              image,
              bucketkey,
              image2,
              bucketkey2,
              image3,
              bucketkey3,
              image4,
              bucketkey4: value,
              image5,
              bucketkey5,
              category,
              userid,
            };
            const result = onChange(modelFields);
            value = result?.bucketkey4 ?? value;
          }
          if (errors.bucketkey4?.hasError) {
            runValidationTasks("bucketkey4", value);
          }
          setBucketkey4(value);
        }}
        onBlur={() => runValidationTasks("bucketkey4", bucketkey4)}
        errorMessage={errors.bucketkey4?.errorMessage}
        hasError={errors.bucketkey4?.hasError}
        {...getOverrideProps(overrides, "bucketkey4")}
      ></TextField>
      <TextField
        label="Image5"
        isRequired={false}
        isReadOnly={false}
        value={image5}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              email,
              phone,
              text,
              url,
              price,
              status,
              latitude,
              longitude,
              image,
              bucketkey,
              image2,
              bucketkey2,
              image3,
              bucketkey3,
              image4,
              bucketkey4,
              image5: value,
              bucketkey5,
              category,
              userid,
            };
            const result = onChange(modelFields);
            value = result?.image5 ?? value;
          }
          if (errors.image5?.hasError) {
            runValidationTasks("image5", value);
          }
          setImage5(value);
        }}
        onBlur={() => runValidationTasks("image5", image5)}
        errorMessage={errors.image5?.errorMessage}
        hasError={errors.image5?.hasError}
        {...getOverrideProps(overrides, "image5")}
      ></TextField>
      <TextField
        label="Bucketkey5"
        isRequired={false}
        isReadOnly={false}
        value={bucketkey5}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              email,
              phone,
              text,
              url,
              price,
              status,
              latitude,
              longitude,
              image,
              bucketkey,
              image2,
              bucketkey2,
              image3,
              bucketkey3,
              image4,
              bucketkey4,
              image5,
              bucketkey5: value,
              category,
              userid,
            };
            const result = onChange(modelFields);
            value = result?.bucketkey5 ?? value;
          }
          if (errors.bucketkey5?.hasError) {
            runValidationTasks("bucketkey5", value);
          }
          setBucketkey5(value);
        }}
        onBlur={() => runValidationTasks("bucketkey5", bucketkey5)}
        errorMessage={errors.bucketkey5?.errorMessage}
        hasError={errors.bucketkey5?.hasError}
        {...getOverrideProps(overrides, "bucketkey5")}
      ></TextField>
      <TextField
        label="Category"
        isRequired={true}
        isReadOnly={false}
        value={category}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              email,
              phone,
              text,
              url,
              price,
              status,
              latitude,
              longitude,
              image,
              bucketkey,
              image2,
              bucketkey2,
              image3,
              bucketkey3,
              image4,
              bucketkey4,
              image5,
              bucketkey5,
              category: value,
              userid,
            };
            const result = onChange(modelFields);
            value = result?.category ?? value;
          }
          if (errors.category?.hasError) {
            runValidationTasks("category", value);
          }
          setCategory(value);
        }}
        onBlur={() => runValidationTasks("category", category)}
        errorMessage={errors.category?.errorMessage}
        hasError={errors.category?.hasError}
        {...getOverrideProps(overrides, "category")}
      ></TextField>
      <TextField
        label="Userid"
        isRequired={true}
        isReadOnly={false}
        value={userid}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              email,
              phone,
              text,
              url,
              price,
              status,
              latitude,
              longitude,
              image,
              bucketkey,
              image2,
              bucketkey2,
              image3,
              bucketkey3,
              image4,
              bucketkey4,
              image5,
              bucketkey5,
              category,
              userid: value,
            };
            const result = onChange(modelFields);
            value = result?.userid ?? value;
          }
          if (errors.userid?.hasError) {
            runValidationTasks("userid", value);
          }
          setUserid(value);
        }}
        onBlur={() => runValidationTasks("userid", userid)}
        errorMessage={errors.userid?.errorMessage}
        hasError={errors.userid?.hasError}
        {...getOverrideProps(overrides, "userid")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || itemModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || itemModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
