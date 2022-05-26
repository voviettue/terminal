# Collection Page

> The Collection Page displays all Items within a Collection and comes with highly configurable Layouts for browsing,
> visualizing, and managing these Items.

[[toc]]

::: tip Before You Begin

To use the Collection Page, you will need to know about [Collections](/getting-started/glossary/#collections),
[Items](/getting-started/glossary/#items) and [Fields](/getting-started/glossary/#fields).

<!--
@TODO getting-started > 30-90 min tutorial
Link to tutorial
-->

:::

## Adjust Page Layout

<video autoplay muted loop controls title="Layouts">
	<source src="https://cdn.directus.io/docs/v9/app-guide/content/content-collections/content-collections-20220415A/adjust-page-layout-20220415A.mp4" type="video/mp4" />
</video>

Layouts determine how you view or interact with Items in a Collection. Whether your Collection contains blog posts,
project management tasks, geo-coordinates, temporal data or beyond; Layouts present Items in a more human-friendly way.
[Learn More](/app/layouts)

## Search Items

<video autoplay muted loop controls title="Search Items">
	<source src="https://cdn.directus.io/docs/v9/app-guide/content/content-collections/content-collections-20220415A/search-items-20220419A.mp4" type="video/mp4" />
</video>

Find all Items with one or more Fields containing your searched value, excluding any Items which have been
[filtered out](#filter-items). To search through a Collection's Items, follow the steps below.

1. Navigate to the Content Module and select the desired Collection.
2. Select <span mi icon>search</span> in the Page Header and a search bar will appear.
3. Type in the value to search for.

## Filter Items

<video autoplay muted loop controls title="Filter Items">
	<source src="https://cdn.directus.io/docs/v9/app-guide/content/content-collections/content-collections-20220415A/filter-items-2022019A.mp4" type="video/mp4" />
</video>

Filters allow you to conditionally select Items from a Collection. Use-cases include customizing Item search results,
restricting Item access permissions for specific Users or Roles, building dashboard analytics with the Insights module,
and more. To Learn More, see our guide on [Filters](/app/filters/).

## Manually Sort Items

<video autoplay muted loop controls title="Batch Edit Items">
	<source src="https://cdn.directus.io/docs/v9/app-guide/content/content-collections/content-collections-20220415A/manually-sort-items-20220415A.mp4" type="video/mp4" />
</video>

Drag and drop Items to custom sort them as desired. This is only possible on certain Layouts, such as the default
[Table Layout](/app/layouts/#table-layout). To sort a Collection's Items, follow the steps below.

1. Be sure a sorting column has been configured under **"Settings > Data Model > Collection"**.\
_(Shown in the video)_
<!-- @TODO configuration > Data Model: Link -->
2. Navigate to the Content Module and select the desired Collection.
3. In the Sidebar, be sure a [Layout](#adjust-page-layout) is chosen that supports manual sorting.
4. Enable manual sorting:
   - For the Table Layout, toggle <span mi icon>sort</span> in the configured Sort column.
5. Drag Items by their handle into a new position.

::: warning Manual Sorting Requires Configuration

Only available if a Sort column has been configured under:\
**"Settings > Data Model > Collection > Sort"**

<!--@TODO configuration > Data Model: Link -->

:::

:::tip

Sorting saves a value in a [Sort Field](/reference/query/#sort). This value is used to return data in a custom order.
This means that while the values in this Sort Field do get updated and modified, values in other Fields are not changed.

:::

## Automatically Sort Items

<video autoplay muted loop controls title="Automatically Sort Items">
	<source src="https://cdn.directus.io/docs/v9/app-guide/content/content-collections/content-collections-20220415A/automatically-sort-items-20220415A.mp4" type="video/mp4" />
</video>

Sort Items alphabetically or numerically, in ascending or descending order. Sorting is not possible on certain Layouts,
such as the Map Layout. Layouts that do support automatic sorting have controls in slightly different locations. To
learn more, see [Layouts](/app/layouts).

::: tip

Automatic sorting is a non-destructive action which does not change your data.

:::

## View Archived Items

<video autoplay muted loop controls title="View Archived Items">
	<source src="https://cdn.directus.io/docs/v9/app-guide/content/content-collections/content-collections-20220415A/view-archived-items.mp4" type="video/mp4" />
</video>

The no-code app allows you to hide archived Items, display them alongside other Items, or display archived Items only.
To learn how to archive an Item, see our guide on the [Item Page](/app/content/items/#archive-an-item). To change
whether an archived Item is displayed, follow the steps below.

1. Navigate to the Content Module and select the desired Collection.
2. Click **"Archive"** in the Sidebar.
3. Choose the desired view:
   - **"Show Items"**
   - **"Show Archived Items"**
   - **"Show Items + Archived Items"**

:::warning Archiving Requires Configuration

Only available if an Archive column has been configured under:\
 **"Settings > Data Model > Collection > Archive"**.

<!-- @TODO configuration > Data Model: Link to section on archiving -->

:::

## Create Presets and Bookmarks

<video autoplay muted loop controls title="Create Presets and Bookmarks">
	<source src="https://cdn.directus.io/docs/v9/app-guide/content/content-collections/content-collections-20220415A/presets-and-bookmarks-20220415A.mp4" type="video/mp4" />
</video>

Save how a Collection Page looks so that you can return to the exact same view later, including details such as the
Layout, searches, filters, sorting, ordering, etc. To learn more, see our guide on
[Presets and Bookmarks](/configuration/presets-bookmarks/).

## Import / Export Items

![Import and Export Items](https://cdn.directus.io/docs/v9/app-guide/content/content-collections/content-collections-20220415A/imports-exports-20220416A.webp)

The Content, User Directory and File Library modules allow importing and exporting of multiple Items stored as files.
This makes it quick and easy to handle tasks like uploading and downloading new customer information; pulling down sales
data for transformation, reports, analysis, and beyond. To learn more, see how to
[Import and Export Items](/app/import-export/) in file format.

## Batch Delete, Archive or Edit Items

<video autoplay muted loop controls title="Batch Edit Items">
	<source src="https://cdn.directus.io/docs/v9/app-guide/content/content-items/content-items-20220415A/batch-edit-items-20220415A.mp4
" type="video/mp4" />
</video>

It is possible to delete, archive, or edit multiple Items at once from the Collection Page. Deletion will permanently
delete Items from the database, this cannot be reverted. When batch editing, the Item Page opens, allowing you to make
the same edit across multiple Items. Follow the steps below to batch delete, archive, or edit Items.

1. Navigate to the Content Module and select the desired Collection.
2. Choose a [Layout](/app/layouts) that supports multiple Item selection from the Sidebar.\
   (e.g. The Table or Card Layout)
3. Click the Items you wish to select:
   - **Table Layout:** Click <span mi icon>check_box_outline_blank</span> in the left-most column.
   - **Card Layout:** Click <span mi icon>radio_button_unchecked</span> in the upper left-hand corner of each Card.

Once Items are selected, the following buttons will appear in the Page Header: <span mi btn muted>delete</span>
<span mi btn muted>archive</span> <span mi btn muted>edit</span>

**Delete**\
4. Click <span mi btn dngr>delete</span> in the header and a popup will appear.\
5. Click **"Delete"** to confirm the action.

**Archive**\
4. Click <span mi btn muted>archive</span> in the header and a popup will appear.\
5. Click **"Delete"** to confirm the action.

**Edit**\
4. Click <span mi btn muted>edit</span> in the header and the Item Page will open.\
5. Update Item details as desired.\
6. Click <span mi btn>check</span> to confirm batch edits on all Items.
