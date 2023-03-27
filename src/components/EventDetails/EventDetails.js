import React from 'react'
import TopBar from '../EventsPage/TopBar'

export default function EventDetails() {
  return (
    <div className='background'>
      <div className='bg-image'></div>
      <TopBar/>

      <div className='event-details scrollbar-style'>
        <div className='banner-info'>
            <p>Dragon swing</p>
            <p>Kraków, Polska</p>
        </div>
        {/* <img className='banner' src='https://cdn.pixabay.com/photo/2016/12/08/23/36/round-dance-1893396_960_720.jpg'></img> */}
        
        <div className='description'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel est vel quam tempus tincidunt a quis tellus. Etiam in quam justo. Praesent non erat et nisl euismod viverra non sit amet eros. Pellentesque sed mauris sem. Morbi sagittis mollis laoreet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum in mauris ante. Praesent venenatis hendrerit ex vel rhoncus. Sed condimentum semper ligula, non ullamcorper nisl blandit ac. Etiam viverra, lorem vitae tristique elementum, tortor tellus suscipit metus, id faucibus eros magna eget felis. Nulla scelerisque mollis tortor, quis scelerisque nulla imperdiet sit amet. Fusce faucibus purus eu eros ultrices sodales. Nulla facilisi. Sed sollicitudin, tortor a mattis viverra, augue nisi lobortis magna, vitae eleifend nisl nisl eget nunc.

            Duis maximus aliquet risus vel eleifend. Mauris convallis sem id augue dapibus euismod. Donec libero tellus, convallis ac enim consectetur, placerat dignissim magna. Vestibulum sed tempor ante. Curabitur porta urna vel tortor ullamcorper, fermentum tincidunt ante ultricies. Mauris at porttitor felis, quis efficitur turpis. Donec mollis quam at venenatis pharetra. Fusce nulla ante, efficitur non est vitae, elementum interdum risus. Suspendisse porta aliquet interdum. Aliquam iaculis nisi eget lacus imperdiet suscipit. Nam finibus libero eu mollis tincidunt. Nullam vel mauris a mi ultrices placerat. Nunc sodales pretium metus, et posuere lacus placerat eu. Suspendisse potenti. Suspendisse pulvinar ante at eros pulvinar viverra.

            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget venenatis tortor. Etiam pulvinar et justo a dignissim. Praesent luctus, erat in elementum fermentum, tellus tellus ornare sem, eget luctus velit tortor sed felis. Cras ac scelerisque sapien. Aliquam urna augue, fermentum ut dignissim pulvinar, mollis feugiat tortor. 
        </div>

        <div className='flex-wrapper'>
          <div className='place-date'>
            <p>Kraków, Poland</p>
            <p>16.11.2022 - 20.11.2022</p>
          </div>
          <div className='email-list'>
            <a href = 'mailto:email1@example.com'>email1@example.com</a>
            <a href = 'mailto:email1@example.com'>email1@example.com</a>
            <a href = 'mailto:email1@example.com'>email1@example.com</a>
          </div>
        </div>

        <div className='flex-wrapper'>
          <a href='/events' className='back-btn'>&#60;= Browse events</a>

          <div className='register-btn'>Register =</div>
        </div>
      </div>
    </div>
  )
}
