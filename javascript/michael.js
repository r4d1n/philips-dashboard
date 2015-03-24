console.log('------------------------------------');
function GridClass () {
    this.$grid = $('.grid');
    this.grid = [[]]; 
    this.drawGrid = function () {
        var h = "", rowClass = "";
        var xLen = this.grid.length;
        var yLen = this.grid[0].length;
        for (var y = 0; y < yLen; y++) {
            for (var x = 0; x < xLen; x++) {
                var g = this.grid[x][y];
                h += '<div class="' + rowClass 
                    + ' alt' + g.selected
                    + '"'
                    + ' data-x="' + x + '"'
                    + ' data-y="' + y + '"'
                    + '>'
                h += '</div>';
                rowClass = "";
            }
            rowClass = "newRow";
            h += '<br />';
        }
        this.$grid.html(h);
    }
    
    this.createGrid = function () {
        var baseSize = 3;
        this.grid = [];
        array1 = [{"selected": 0}, {"selected": 1},{"selected": 0}];
        array2 = [{"selected": 2}, {"selected": 0},{"selected": 0}];
        array3 = [{"selected": 0}, {"selected": 0},{"selected": 1}];
        array_empty = [{"selected": 0}, {"selected": 0},{"selected": 0}];
        
        for (var x = 0; x < 24; x++) {
            if (x==3){
               this.grid.push(array1);
            }
            if (x==2){
               this.grid.push(array2);
            }
            else {
                this.grid.push(array_empty);
            }
        }
    }
    
    // Construction
    this.createGrid();
    this.drawGrid();
    console.log("Initial Grid:\n" + JSON.stringify(this.grid));
}
grid = new GridClass();

grid.$grid.on("click", "div", function(e){
    var $thisSquare = $(this);
    console.log("Clicked a square");
    console.log($thisSquare);
    var x = $thisSquare.data("x");
    var y = $thisSquare.data("y");
    //grid.selectSquare(x, y);
    
});
