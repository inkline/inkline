
### API

<i-api-preview title="Container API" expanded>
    <template slot="props">
        <table class="table -bordered">
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Accepted</th>
                    <th>Default</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>fluid</td>
                    <td>Sets the container to cover 100% of the parent's width.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
            </tbody>
        </table>
    </template>
    <template slot="slots">
        <table class="table -bordered _margin-bottom-0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>default</td>
                    <td>Slot for container default content.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>

<i-api-preview title="Row API" expanded>
    <template slot="props">
        <table class="table -bordered">
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Accepted</th>
                    <th>Default</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>noGutter</td>
                    <td>Sets whether the row and child columns have a gutter width.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>noCollapse</td>
                    <td>Sets the flex flow to be <code>row nowrap</code>.</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>start</td>
                    <td>Aligns the content to the start of the row. The alignment can be applied responsively by adding one of the responsive properties <code>startXs</code>, <code>startSm</code>, <code>startMd</code>, <code>startLg</code>, <code>startXl</code> (e.g. will be used as <code>&lt;i-row start-xs&gt;</code> in template).</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>center</td>
                    <td>Aligns the content to the center of the row. The alignment can be applied responsively by adding one of the responsive properties <code>centerXs</code>, <code>centerSm</code>, <code>centerMd</code>, <code>centerLg</code>, <code>centerXl</code> (e.g. will be used as <code>&lt;i-row center-xs&gt;</code> in template).</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>end</td>
                    <td>Aligns the content to the end of the row. The alignment can be applied responsively by adding one of the responsive properties <code>endXs</code>, <code>endSm</code>, <code>endMd</code>, <code>endLg</code>, <code>endXl</code> (e.g. will be used as <code>&lt;i-row end-xs&gt;</code> in template).</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>top</td>
                    <td>Aligns the content to the top of the row. The alignment can be applied responsively by adding one of the responsive properties <code>topXs</code>, <code>topSm</code>, <code>topMd</code>, <code>topLg</code>, <code>topXl</code> (e.g. will be used as <code>&lt;i-row top-xs&gt;</code> in template).</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>middle</td>
                    <td>Aligns the content to the middle of the row. The alignment can be applied responsively by adding one of the responsive properties <code>middleXs</code>, <code>middleSm</code>, <code>middleMd</code>, <code>middleLg</code>, <code>middleXl</code> (e.g. will be used as <code>&lt;i-row middle-xs&gt;</code> in template).</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>bottom</td>
                    <td>Aligns the content to the bottom of the row. The alignment can be applied responsively by adding one of the responsive properties <code>bottomXs</code>, <code>bottomSm</code>, <code>bottomMd</code>, <code>bottomLg</code>, <code>bottomXl</code> (e.g. will be used as <code>&lt;i-row bottom-xs&gt;</code> in template).</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>around</td>
                    <td>Justifies the content position to have space around. The content justifying can be applied responsively by adding one of the responsive properties <code>aroundXs</code>, <code>aroundSm</code>, <code>aroundMd</code>, <code>aroundLg</code>, <code>aroundXl</code> (e.g. will be used as <code>&lt;i-row around-xs&gt;</code> in template).</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>between</td>
                    <td>Justifies the content position to have space between. The content justifying can be applied responsively by adding one of the responsive properties <code>betweenXs</code>, <code>betweenSm</code>, <code>betweenMd</code>, <code>betweenLg</code>, <code>betweenXl</code> (e.g. will be used as <code>&lt;i-row between-xs&gt;</code> in template).</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>reverse</td>
                    <td>Reverses the order of the row content. The content justifying can be applied responsively by adding one of the responsive properties <code>reverseXs</code>, <code>reverseSm</code>, <code>reverseMd</code>, <code>reverseLg</code>, <code>reverseXl</code> (e.g. will be used as <code>&lt;i-row reverse-xs&gt;</code> in template).</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
            </tbody>
        </table>
    </template>
    <template slot="slots">
        <table class="table -bordered _margin-bottom-0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>default</td>
                    <td>Slot for row default content.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>


<i-api-preview title="Column API" expanded>
    <template slot="props">
        <table class="table -bordered">
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Accepted</th>
                    <th>Default</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>xs</td>
                    <td>Sets the number of columns for extra small screens (screen width lower than <code>30rem</code>). A <code>true</code> value will cause it to occupy as much space as it can on extra small screens.</td>
                    <td><code>Number</code>, <code>Boolean</code></td>
                    <td><code>1-12</code>, <code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>sm</td>
                    <td>Sets the number of columns for small screens (screen width lower than <code>48rem</code>). A <code>true</code> value will cause it to occupy as much space as it can on small screens.</td>
                    <td><code>Number</code>, <code>Boolean</code></td>
                    <td><code>1-12</code>, <code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>md</td>
                    <td>Sets the number of columns for medium screens (screen width lower than <code>64rem</code>). A <code>true</code> value will cause it to occupy as much space as it can on medium screens.</td>
                    <td><code>Number</code>, <code>Boolean</code></td>
                    <td><code>1-12</code>, <code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>lg</td>
                    <td>Sets the number of columns for large screens (screen width lower than <code>75rem</code>). A <code>true</code> value will cause it to occupy as much space as it can on large screens.</td>
                    <td><code>Number</code>, <code>Boolean</code></td>
                    <td><code>1-12</code>, <code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>xlg</td>
                    <td>Sets the number of columns for extra large screens (screen width lower than <code>92.5rem</code>). A <code>true</code> value will cause it to occupy as much space as it can on extra large screens.</td>
                    <td><code>Number</code>, <code>Boolean</code></td>
                    <td><code>1-12</code>, <code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>first</td>
                    <td>Orders the column to be first. The order can be applied responsively by adding one of the responsive properties <code>firstXs</code>, <code>firstSm</code>, <code>firstMd</code>, <code>firstLg</code>, <code>firstXl</code> (e.g. will be used as <code>&lt;i-column first-xs&gt;</code> in template).</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>last</td>
                    <td>Orders the column to be last. The order can be applied responsively by adding one of the responsive properties <code>lastXs</code>, <code>lastSm</code>, <code>lastMd</code>, <code>lastLg</code>, <code>lastXl</code> (e.g. will be used as <code>&lt;i-column last-xs&gt;</code> in template).</td>
                    <td><code>Boolean</code></td>
                    <td><code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>offset</td>
                    <td>Offsets the column by a number of columns. The offset can be applied responsively by adding one of the responsive properties <code>offsetXs</code>, <code>offsetSm</code>, <code>offsetMd</code>, <code>offsetLg</code>, <code>offsetXl</code> (e.g. will be used as <code>&lt;i-column offset-xs="4"&gt;</code> in template).</td>
                    <td><code>Number</code>, <code>Boolean</code></td>
                    <td><code>1-12</code>, <code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>push</td>
                    <td>Pushes the column by a number of columns. This is useful for keeping the markup order while changing the display order of the columns. The push can be applied responsively by adding one of the responsive properties <code>pushXs</code>, <code>pushSm</code>, <code>pushMd</code>, <code>pushLg</code>, <code>pushXl</code> (e.g. will be used as <code>&lt;i-column push-xs="4"&gt;</code> in template).</td>
                    <td><code>Number</code>, <code>Boolean</code></td>
                    <td><code>1-12</code>, <code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
                <tr>
                    <td>pull</td>
                    <td>Pulls the column by a number of columns. This is useful for keeping the markup order while changing the display order of the columns. The pull can be applied responsively by adding one of the responsive properties <code>pullXs</code>, <code>pullSm</code>, <code>pullMd</code>, <code>pullLg</code>, <code>pullXl</code> (e.g. will be used as <code>&lt;i-column pull-xs="4"&gt;</code> in template).</td>
                    <td><code>Number</code>, <code>Boolean</code></td>
                    <td><code>1-12</code>, <code>true</code>, <code>false</code></td>
                    <td><code>false</code></td>
                </tr>
            </tbody>
        </table>
    </template>
    <template slot="slots">
        <table class="table -bordered _margin-bottom-0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>default</td>
                    <td>Slot for column default content.</td>
                </tr>
            </tbody>
        </table>
    </template>
</i-api-preview>
