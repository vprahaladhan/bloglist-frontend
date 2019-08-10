const blogs = [
  { 'id':'5d410e0fd1246e301c4791a5',
    'likes':7,
    'title':'World Peace',
    'author':'Prahal',
    'url':'http://www.worldpeace.com',
    'user':
        { 'id':'5d4123618e2b7e3d2430d970',
          'username': 'suresh',
          'name':'Suresh' } },
  { 'id':'5d411b8b81f6143fecef3780',
    'likes':1005,
    'title':'IT is fun',
    'author':'Prahal',
    'url':'http://www.itisfun.com',
    'user':
        { 'id':'5d407d434177de1cb8582dcd',
          'username': 'prahal',
          'name':'Prahal' } },
  { 'id':'5d49098f0e9b980004faa0a7',
    'likes':8,
    'title':'Life is good',
    'author':'Prahal',
    'url':'http://www.lifesgood.com.au',
    'user':
        { 'id':'5d446bc98ce30f09945c9be6',
          'username': 'oracle',
          'name':'Oracle' } }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }