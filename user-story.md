# GiftLink User Stories

## User Story Template

### User Story

As a [type of user],
I want [an action or feature],
So that [benefit or reason].

### Details and Assumptions

- The user has access to the GiftLink application.
- The required data is available in the database.
- The user can access the feature through the application interface.

### Acceptance Criteria

Given [context],
When [action],
Then [outcome].

---

## Example User Stories

### User Story 1

As a user who wants to give away unused household items,
I want to create an item listing,
So that other users can find and reuse the item instead of buying a new one.

### Details and Assumptions

- The user can provide item information.
- The item information is stored in the database.

### Acceptance Criteria

Given that the user has item information,
When the user creates an item listing,
Then the item should be saved and displayed to other users.

---

### User Story 2

As a user looking for free household items,
I want to search for available items by category,
So that I can quickly find items that meet my needs.

### Details and Assumptions

- Items have categories.
- The search function can filter items by category.

### Acceptance Criteria

Given that items exist in the database,
When the user searches by category,
Then matching items should be displayed.

---

### User Story 3

As a registered user,
I want to log in securely,
So that I can access my account.

### Details and Assumptions

- The user has already registered.
- The user provides a valid email and password.

### Acceptance Criteria

Given that the user has a registered account,
When the user enters valid login credentials,
Then the user should be successfully logged in.

---

### User Story 4

As a user,
I want to view the details of an item,
So that I can decide whether the item is suitable for me.

### Details and Assumptions

- Items have unique IDs.
- Item details are stored in the database.

### Acceptance Criteria

Given that an item exists,
When the user selects the item,
Then the item's details should be displayed.

---

### User Story 5

As a user,
I want to comment on an item,
So that I can communicate with other users about the item.

### Details and Assumptions

- The item exists in the database.
- Users can submit comments.

### Acceptance Criteria

Given that an item exists,
When the user submits a comment,
Then the comment should be associated with the item.

---

### User Story 6

As a registered user,
I want to update my profile information,
So that my account information remains current.

### Details and Assumptions

- The user is registered.
- The user provides updated profile information.

### Acceptance Criteria

Given that the user is registered,
When the user updates profile information,
Then the updated information should be saved.

---

### User Story 7

As a user,
I want to browse available gifts,
So that I can find useful items that are being given away.

### Details and Assumptions

- Gift items are stored in the database.
- Available items can be retrieved through the API.

### Acceptance Criteria

Given that gifts are available,
When the user opens the gifts page,
Then the available gifts should be displayed.

---

### User Story 8

As a user,
I want to see images of listed items,
So that I can understand the condition and appearance of an item.

### Details and Assumptions

- Items can have associated images.
- Images are available through the application.

### Acceptance Criteria

Given that an item has an image,
When the user views the item,
Then the item's image should be displayed.