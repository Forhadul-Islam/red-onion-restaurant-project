import lunch from './lunch';
import breakfast from './breakfast';
import dinner from './dinner';

const fakeData = [...lunch, ...breakfast, ...dinner];

// const shuffle = a => {
//     for (let i = a.length; i; i--) {
//         let j = Math.floor(Math.random() * i);
//         [a[i - 1], a[j]] = [a[j], a[i - 1]];
//     }
// }

// shuffle(fakeData);

export default fakeData;