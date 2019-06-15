export default {
    name: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 32
      }
    },
    teamName: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 32
      }
    },
    email: {
      presence: { allowEmpty: false, message: 'is required' },
      email: true,
      length: {
        maximum: 64
      }
    },
    password: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 128
      }
    },
    policy: {
      presence: { allowEmpty: false, message: 'is required' },
      checked: true
    }
  };