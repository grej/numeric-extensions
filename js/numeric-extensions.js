/*global window */
/*global numeric */
/*jslint plusplus: true */

var numeric = (function (window, undefined, numeric) {
    'use strict';
    if (!window.numeric) {
        throw ("Module needs numeric.js library!");
    }

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

    numeric.maxRealEigenvalue = function (A) {
        var i, absImaginary,
            maxEig = 0,
            arrLen = numeric.eig(A).lambda.x.length,
            eigs = numeric.eig(A).lambda;
        
        for (i = 0; i < arrLen; i++) {
            absImaginary = Math.abs(numeric.eig(A).lambda.y[i]);
            if (eigs.x[i] > maxEig && absImaginary < 0.00001) maxEig = eigs.x[i];
        }
        return maxEig;
    };

    numeric.unitVector = function (v) {
        return numeric.div(v, numeric.sum(v));
    };

    numeric.priorityVector = function (v) {
        return numeric.unitVector(numeric.principalEigenvector(v));
    };

    numeric.randomConsistencyIndex = function (matrixSize) {
        var ci = {
            1: 0,
            2: 0,
            3: 0.58,
            4: 0.9,
            5: 1.12,
            6: 1.24,
            7: 1.32,
            8: 1.41,
            9: 1.45,
            10: 1.49,
            11: 1.51,
            12: 1.54,
            13: 1.56,
            14: 1.57,
            15: 1.59
        };
        return ci[matrixSize];
    };
    
    numeric.consistencyIndex = function (A) {
        var len = A.length,
            numerator = numeric.maxRealEigenvalue(A) - len,
            denominator = len - 1;
        return numerator / denominator;
    };
    
    numeric.consistencyRatio = function (A) {
        var len = A.length,
            numerator = numeric.consistencyIndex(A),
            denominator = numeric.randomConsistencyIndex(len);
        
        return numerator / denominator;
    };
    
    numeric.getRow = function (A, rowNum) {
        var row = A[rowNum];
        return row;
    };
    
    numeric.geoMean = function (v) {
        var currentProduct = 1;
        function mult(element, index, array) {
            currentProduct = currentProduct * element;
        }
        v.forEach(mult);
        return Math.pow(currentProduct, 1.0 / v.length);
    };
    
    numeric.normalizedGeomeanVector = function (A) {
        var row,
            pVect = [],
            len = A.length;
        for (row = 0; row < len; row++) {
            pVect.push(numeric.geoMean(numeric.getRow(A, row)));
        }
        return numeric.div(pVect, numeric.sum(pVect));
    };
    

    return numeric;

}(window, undefined, numeric));