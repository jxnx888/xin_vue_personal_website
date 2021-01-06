THREE.OrientationControls = (function () {

    function epsilon( value ) {

        return Math.abs( value ) < 1e-10 ? 0 : value;

    }

    function getObjectCSSMatrix( matrix ) {

        const elements = matrix.elements;
        const matrix3d = 'matrix3d(' +
            epsilon( elements[ 0 ] ) + ',' +
            epsilon( elements[ 1 ] ) + ',' +
            epsilon( elements[ 2 ] ) + ',' +
            epsilon( elements[ 3 ] ) + ',' +
            epsilon( -elements[ 4 ] ) + ',' +
            epsilon( -elements[ 5 ] ) + ',' +
            epsilon( -elements[ 6 ] ) + ',' +
            epsilon( -elements[ 7 ] ) + ',' +
            epsilon( elements[ 8 ] ) + ',' +
            epsilon( elements[ 9 ] ) + ',' +
            epsilon( elements[ 10 ] ) + ',' +
            epsilon( elements[ 11 ] ) + ',' +
            epsilon( elements[ 12 ] ) + ',' +
            epsilon( elements[ 13 ] ) + ',' +
            epsilon( elements[ 14 ] ) + ',' +
            epsilon( elements[ 15 ] ) +
            ')';


        return 'translate(-50%,-50%)' + matrix3d;

    }

    const matrix = new THREE.Matrix4;

    const defaultStyle = `
        .orientationControls {
            font-family: sans-serif;
            position: absolute;
            z-index: 1;
            transform: scaleY(-1);
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        
        .orientationControls > .box {
            position: relative;
            transform-style: preserve-3d;
        }
        
        .orientationControls > .box > .face {
            cursor: grab;
            background-color: #dadee9;
            position: absolute;
            box-shadow: inset 0 0 0 2px #747883;
            font-weight: bold;
            color: #747883;
            text-align: center;
        }
        
        .orientationControls > .box > .face:hover {
            background-color: #a8acba;
        }
        
        .orientationControls > .box > .ring {
			pointer-events: none;
            position: absolute;
            border-radius: 100%;
            box-shadow: inset 0 0 0 3px #747883, 0 0 0 10px #dadee92e;
        }
        .orientationControls > .box > .ring > div {
            color: #747883;
            position: absolute;
            font-weight: bold;
        }
    `;

    const sides = {
        front: 'rotateY(  0deg) translateZ(%SIZE)',
        right: 'rotateY( 90deg) translateZ(%SIZE)',
        back: 'rotateY(180deg) translateZ(%SIZE)',
        left: 'rotateY(-90deg) translateZ(%SIZE)',
        top: 'rotateX( 90deg) translateZ(%SIZE)',
        bottom: 'rotateX(-90deg) translateZ(%SIZE)'
    };

    const offsets = {
        n: [ 0, -1 ],
        e: [ 1, 0 ],
        s: [ 0, 1 ],
        w: [ -1, 0 ]
    };

    function OrientationControls( size, options ) {

        size = size || 80;
        options = options || {};

        const unit = 'px';
        const half = size / 2;


        options.perspective = options.perspective || false;
        options.defaultStyle = options.defaultStyle !== undefined ? options.defaultStyle : true;

        if ( options.defaultStyle && !OrientationControls.cssElement ) {

            const head = document.head || document.getElementsByTagName( 'head' )[ 0 ];
            const element = document.createElement( 'style' );

            element.id = 'orientationControls';
            element.href = undefined;
            element.appendChild( document.createTextNode( defaultStyle ) );

            head.insertBefore( element, head.firstChild );

            OrientationControls.cssElement = element;

        }


        // Container

        const container = document.createElement( 'div' );

        container.className = 'orientationControls';

        container.style.width = size + unit;
        container.style.height = size + unit;
        container.style.left = size / 2 + unit;
        container.style.top = size / 2 + unit;


        // Box

        const box = document.createElement( 'div' );

        box.className = 'box';
        box.style.width = size + unit;
        box.style.height = size + unit;
        box.style.fontSize = ( size / 6 ) + unit;

        container.appendChild( box );


        // Ring + cardinal points

        const ring = document.createElement( 'div' );

        const R = 1.7320508075688772;
        const s = size * R / 2;

        const directions = {
            n: 'translateX(' + s + unit + ') translateY(' + 0 + unit + ')',
            e: 'translateX(' + s * 2 + unit + ') translateY(' + s + unit + ')',
            s: 'translateX(' + s + unit + ') translateY(' + s * 2 + unit + ')',
            w: 'translateX(' + 0 + unit + ') translateY(' + s + unit + ')'
        };

        function direction( name ) {

            const e = document.createElement( 'div' );

            const id = name.toLowerCase();

            const fs = size / 6;


            e.id = id;
            e.textContent = name;
            e.style.transform = directions[ id ];
            e.style.fontSize = fs + unit;
            e.style.left = ( -size / 2 / 6 - offsets[ id ][ 0 ] * fs ) + unit;
            e.style.top = ( -size / 2 / 6 - offsets[ id ][ 1 ] * fs ) + unit;

            ring.appendChild( e );
        }

        direction( 'N' );
        direction( 'E' );
        direction( 'S' );
        direction( 'W' );

        ring.className = 'ring';
        ring.style.transform = 'rotateX(90deg) translateZ(' + ( -size / 5 ) + unit + ') translateX(' + ( -size / 3 ) + unit + ')';
        ring.style.width = size * R + unit;
        ring.style.height = size * R + unit;

        box.appendChild( ring );


        // Sides

        function plane( side ) {

            const e = document.createElement( 'div' );

            const id = side.toLowerCase();

            e.id = id;
            switch(side){
				case 'Front':
					e.textContent = "前";
					break;
				case 'Right':
					e.textContent = "右";
					break;
				case 'Back':
					e.textContent = "后";
					break;
				case 'Left':
					e.textContent = "左";
					break;
				case 'Top':
					e.textContent = "上";
					break;
				case 'Bottom':
					e.textContent = "下";
					break;
			}
            // e.textContent = side;
            e.className = id + ' face';

            e.style.width = size + unit;
            e.style.height = size + unit;
            e.style.transform = sides[ id ].replace( '%SIZE', ( size / 2 ) + unit );
            e.style.lineHeight = size + unit;

            box.appendChild( e );

            return e;

        }

        plane( 'Front' );
        plane( 'Right' );
        plane( 'Back' );
        plane( 'Left' );
        plane( 'Top' );
        plane( 'Bottom' );

		/*plane( '前' );
        plane( '右' );
        plane( '后' );
        plane( '左' );
        plane( '上' );
        plane( '下' );
*/


        this.element = container;

        this.update = function () {

            matrix.copy( camera.matrixWorldInverse );

            matrix.elements[ 12 ] = half;
            matrix.elements[ 13 ] = half;
            matrix.elements[ 14 ] = 0;

            const style = getObjectCSSMatrix( matrix );

            box.style.WebkitTransform = style;
            box.style.transform = style;

			container.style.perspective = ( ( options.perspective && camera.isPerspectiveCamera ) ?
			( Math.pow( size * size + size * size, 0.5 ) / Math.tan( ( camera.fov / 2 ) * Math.PI / 180 ) ) : 0 ) + unit;



        };

    }

    return OrientationControls;

}());
