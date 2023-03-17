# ip-classifier-generator

## Description

The `ip-classifier-generator` package allows for `identifying the class of an IPv4 address` and `generating random IP` addresses within a `specified class and range`. It is useful for `network administrators` and `developers working with IP` addresses.

## Installing

```bash
 $ npm install ip-classifier-generator@latest
```

## Importing

  ```bash
    // Using Node.js `require()`
    const icg = require('ip-classifier-generator');

    // Using ES6 imports
    import icg from 'ip-classifier-generator';

  ```
## Usage
  ```bash

    console.log(icg.getIPClass('198.248.213.31')); # Identifying the class of an IPv4 address
    /// { class: 'C', range: '192-223' }


    console.log(icg.randomIPV4ByClass('E'));       # Generate Random IP within specified class
    /// 241.8.135.66


    console.log(
      icg.randomIPV4ByRange({                      # Generate Random IP within specified range
        firstOctet: { min: 20, max: 50 },
        secondOctet: { min: 60, max: 90 },
        thirdOctet: { min: 100, max: 130 },
        fourthOctet: { min: 140, max: 170 },
      }),
    );
    /// 30.80.122.140

     console.log(
      icg.randomIPV4ByRange({                      # Generate Random IP with predefined octets
        firstOctet: 40,
        secondOctet: 10,
        thirdOctet: { min: 100, max: 130 },
        fourthOctet: { min: 140, max: 170 },
      }),
    );
    /// 40.10.125.166

  ```

## Authors

- **WeeTech Solution PVT LTD**

## Stay in touch

- Website - [https://www.weetechsolution.com/](https://www.weetechsolution.com/)
- GitHub - [WeeTech Solution](https://github.com/weetech)
