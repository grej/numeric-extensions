/*global window */
/*global numeric */
/*jslint plusplus: true */

var numeric = (function (window, undefined, numeric) {
    'use strict';
    if (!window.numeric) {throw ("Module needs numeric.js library!"); }
    
    numeric.principalEigenvalueIdx = function (A) {
        return numeric.maxElementIndex(numeric.eig(A).lambda.x);
    };
    
    numeric.maxElementIndex = function (v) {
        var max = 0,
            len = v.length,
            i = 0,
            idxToReturn = 0;

        for (i; i < len; i++) {
            if (Math.abs(v[idxToReturn]) > max) {
                // idx of max eigenvalue
                max = Math.abs(v[idxToReturn]);
                idxToReturn = i;
            }
        }
        
        return idxToReturn;
    };
    
    numeric.principalEigenvector = function (A) {
        var vect = [],
            i = 0,
            maxIdx = numeric.principalEigenvalueIdx(A),
            len = numeric.eig(A).E.x.length;

        for (i; i < len; i++) {
            vect.push(Math.abs(numeric.eig(A).E.x[i][maxIdx]));
        }
        vect = numeric.abs(vect);

        return vect;
    };
    
    numeric.unitVector = function (v) {
        return numeric.div(v, numeric.sum(v));
    };
    
    numeric.priorityVector = function (v) {
        return numeric.unitVector(numeric.principalEigenvector(v));
    };
    
    return numeric;
    
}(window, undefined, numeric));