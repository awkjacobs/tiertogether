# TODO Items

### TODO

- [ ] create actual README file
- [ ] figure out the branch protection stuff on GitHub
- [ ] figure out open source stuff

- [ ] Add Dialog

    - [x] add pagination
    - [ ] <-OPTIONAL-> add more search options

- [ ] Create Admin Page

    - [ ] add admin page
    - [ ] add admin role

- [ ] finish notifications

    - [x] optimize notifications to cut down on db calls and storage
    - [x] setup mark all as read button
    - [x] setup click notification to mark as read
    - [x] add notifications for all applicable actions
        - [x] someone joining a board
        - [x] someone leaving a board
        - [x] someone being kicked from a board
        - [x] new board owner
    - [x] add date to notifications
    - [x] add filters to notifications
    - [ ] <-OPTIONAL-> serve only a limited number, and use an add button / figure out infinite scroll
    - [ ] <-OPTIONAL-> simplify the content of the notifications if db space is an issue
    - [ ] <-OPTIONAL-> include # of unread notifications in title

- [ ] <-OPTIONAL-> redo the scoring system to go top down using length and better score data, allow for scalability
- [ ] <-OPTIONAL-> set up local development database https://vercel.com/docs/storage/vercel-postgres/local-development#option-2:-local-postgres-instance-with-docker

### COMPLETE

- [x] remove the auth0 stuff
- [x] set up invite button
- [x] create invite page
- [x] create share link for invites
- [x] look into QR codes for share link invites
- [x] change invitation accepted to link to users
- [x] invite link singup throwing prisma create user error
- [x] update name on new user not changing in profile button
- [x] deal with multiple instances of the same item on different boards
- [x] moving now sets the rank but then sets it back to the original
- [x] correct score display
- [x] add numbers to ranks
- [x] change server diff to top right
- [x] maybe change tier colors
- [x] redesign the item info dialog
- [x] fix slider
- [x] NewBoard dialog invite users?
- [x] finish remove user from boards button
- [x] add card scale options
- [x] invites are broken
- [x] add created at to notifications
- [x] move items from any removed rows back to queue
- [x] server average ranks seem wrong
- [x] redo items to reduce the amount of data in db, switch to fetching with cache
- [x] deal with invalid date for last air date - Search Card
- [x] add chart to server ranks
- [x] make server ranks repsonsive instead of just tooltips
- [x] redo ranking and server stuff, db calls are very slow
- [x] Move to seperate repo
- [x] replace user vs server ranks with all users and server ranks
- [x] Upgrade to next 15 <!-- DND-KIT had issues in the upgrade process, used --legacy-deps, may need to revisit if issues persist -->
- [x] try context providers for appData
- [x] uses forms for:
      ---- [X] NewBoard dialog
      ---- [X] EditDialog
      ---- [X] AddDialog
      ---- [X] Accept Invitation
- [x] redo info dialog to use info component for all instances
- [x] get production OAuth keys

    - [x] Google
    - [x] Microsoft
    - [x] ~~Apple~~ Requires a paid apple developer account, $100/year

- [x] add favicon
- [x] add title on each page
- [x] make board text ~~into text fields~~ editable in edit menu
- [x] deal with the multiple modals when opening collection cards
- [x] clean up the landing page
- [x] clean up email invite artifacts
- [x] revist theo video about patterns
- [x] fix the Items table id field since it probably isn't unique
- [x] add tooltips to buttons
- [x] fix rank chart names

## Roadmap

- [ ] add list view
- [ ] add books
- [ ] add more types if possible
