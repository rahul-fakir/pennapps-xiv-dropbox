# Pennapps XIV - Dr0pbox 2.0

## Inspiration
Over the past five years, data has not just been a luxury, it has been a need. Each day, hundreds of millions of files are uploaded and shared over the internet, resulting in cloud storage becoming increasingly essential. As students, the need to store and access data at anytime from anywhere has become a necessity and we embarked on this journey to provide free and unlimited storage for everyone. We also needed a robust solution.

Who doesn't want unlimited storage? And who doesn't like free stuff? We combined the two, to bring you the best.

## What it does
By accessing the Dropbox API, we synchronously chunk-upload files to multiple DropBox accounts using an automated account creation process. Our backend dynamically allocates free space for the user, all without the need for front end interaction. However, due to time constraints, and lack of access to Google's full OCR platform, we manually implemented this process.

Filled up an account? No problem, we'll move to the next one.

## How we built it
DropBox offers a free tier option to users, where they can upload a limited amount of data. Keeping this in mind, we designed our backend in such a way that we could connect multiple DropBox accounts for a single user without the need for them to authenticate or create DropBox accounts. This essentially allows for a single user to have virtually unlimited storage as if one accounts storage capacity is exceeded, a new account is automatically initialized for them on our platform. Users, therefore, access their files through our platform, but we essentially run headless, connecting the two together.

## Technical Talk:
Using Node in the backend with MongoDB, we essentially created a virtual cloud, which amalgamates multiple DropBox accounts for each user. This is then relayed to the front end where it can be interacted with in a user-friendly manner through Materialize.css.

## Challenges I ran into
One of the biggest challenges for this project was bypassing the need for a Captcha as well as automating the creation of email and DropBox accounts. Since there is no API to accomplish this, we took an elementary approach and conceptualized a macro which would click through the sites for us. Using Google's OCR which we tested through Google Translate's 'Image to Text Feature', we bypassed the DropBox Captcha in near perfect number of attempts.

Once again, due to time constraints, this was not fully implemented and for the sake of completeness, we manually assisted in the process.

## Accomplishments that we're proud of
A functioning model by the end of the first night, and working on making it presentable by the next.
Creating a simple hack to overcome a seemingly complex task.

## What we learned
I'm sorry DropBox, we've always loved you, and will continue to love you. This was purely a learning experience.

## What's next for Dr0pbox
- Implementing automated account creation
- Breaking down files through bit by bit encoding to increase storage efficiency
- Complete CRUD operations on our platform
- Switching between grid and list-view and even more user-friendly interface
