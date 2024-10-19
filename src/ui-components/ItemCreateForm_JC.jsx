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
            name="text"
            placeholder="Text"
            label="Text"
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
          <TextField
            name="latitude"
            id="latitude"
            placeholder="Latitude"
            label="Latitude"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="longitude"
            id="longitude"
            placeholder="Longitude"
            label="Longitude"
            labelHidden
            variation="quiet"
            required
          />
          <View
            name="image"
            as="input"
            type="file"
            style={{ alignSelf: "end" }}
          />
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